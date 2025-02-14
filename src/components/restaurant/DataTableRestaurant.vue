<template lang="html">
  <div class="row justify-content-end mb-2">
    <div class="col-1 text-end">
      <Button severity="contrast" title="Adicionar mesa" icon="pi pi-plus" @click="visibleTableCreate = true" />
    </div>
  </div>
  <div class="card">
    <DataTable :value="tables" tableStyle="min-width: 50rem" scrollable scrollHeight="500px">
      <template #empty> Nenhuma mesa encontrada. </template>
      <Column field="identification" header="Mesa" sortable style="width: 40%"></Column>
      <Column field="capacity" header="Capacidade" sortable></Column>
      <Column header="Editar" bodyStyle="text-align:center" style="width: 10%">
        <template #body="row">
          <Button severity="contrast" title="Editar mesa" icon="pi pi-pencil" @click="editTable(row.data)" />
        </template>
      </Column>
      <Column header="Reservar" bodyStyle="text-align:center" style="width: 10%">
        <template #body="row">
          <Button v-if="!row.data.reserved" title="Reservar mesa" severity="success" icon="pi pi-calendar-clock" @click="reserve(row.data)" />
          <Button v-if="row.data.reserved" title="Cancelar mesa" severity="danger" icon="pi pi-calendar-clock"
            @click="cancelReserve(row.data.id)" />
        </template>
      </Column>
      <Column header="Liberar" bodyStyle="text-align:center" style="width: 10%">
        <template #body="row">
          <Button v-if="row.data.reserved" title="Liberar mesa" severity="info" icon="pi pi-check" @click="release(row.data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>

  <DialogCreate 
    v-model:visible="visibleTableCreate" 
    @close-dialog="closeDialogCreate" 
  />

  <DialogEdit 
    v-model:visible="visibleTableEdit"
     @close-dialog="closeDialogEdit" 
     :table-id="tableId" 
  />

  <DialogReserve
    v-model:visible="visibleTableReserve"
    @close-dialog="closeDialogReserve"
    :table-id="tableId"
  />
</template>

<script setup lang="js">

import { ref, onMounted, watch } from 'vue';
import { DataTable, Column, Button } from 'primevue';
import { useRoute } from 'vue-router';
import { useReservationService } from '@/services/api/ReservationService';
import { useToastService } from '@/shared/ToastService';
import DialogCreate from '@/components/dialog-create/DialogCreate.vue';
import DialogEdit from '@/components/dialog-edit/DialogEdit.vue';
import DialogReserve from '@/components/dialog-reserve/DialogReserve.vue';
import { useTableService } from '@/services/api/TableService';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();

const visibleTableEdit = ref(false);
const visibleTableReserve = ref(false);
const visibleTableCreate = ref(false);

const tables = ref();
const { showToast } = useToastService();

const tableId = ref(0);

const editTable = (data) => {
  visibleTableEdit.value = true;
  tableId.value = data.id;
};

const tableService = useTableService();
const reservationService = useReservationService();

const reserve = (data) => {
  visibleTableReserve.value = true;
  tableId.value = data.id
}


const closeDialogCreate = (args) => {
  visibleTableCreate.value = false;
  if(!args?.cancelEvent)
    loadDataTable();
}

const closeDialogEdit = (args) => {
  visibleTableEdit.value = false;
  if(!args?.cancelEvent)
    loadDataTable();
}

const closeDialogReserve = (args) => {
  visibleTableReserve.value = false;
  if(!args?.cancelEvent)
    loadDataTable();
}

const cancelReserve = (tableId) => {
  reservationService.Cancel(tableId)
    .then(_ => {
      showToast('success', 'Sucesso', 'A reserva foi cancelada!')
      visibleTableReserve.value = false;
      loadDataTable();
    })
    .catch(err => {
      showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
    });
}

const release = (id) => {
  tableService.Release({
    tableId: id
  }).then(_ => {
    showToast('success', 'Sucesso', 'Mesa liberada')
    loadDataTable()
  }).catch(err => {
    showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
  });
}

const loadDataTable = () => {
  tableService.GetByRestaurantId(store.state.restaurant.id).then(response => {
    tables.value = response.data.data;
  })
}

onMounted(() => {
  loadDataTable()
})

watch(() => route.params.id, (newId, oldId) =>{
  loadDataTable()
})

</script>