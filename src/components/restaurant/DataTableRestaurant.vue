<template lang="html">
  <div class="row justify-content-end mb-2">
    <div class="col-1 text-end">
      <Button v-if="route.params.id" severity="contrast" title="Adicionar mesa" icon="pi pi-plus" @click="visibleTableCreate = true" />
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
            @click="cancelReserve(row.data)" />
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
    @close-dialog="closeDialog('create')" 
  />

  <DialogEdit 
    v-model:visible="visibleTableEdit"
     @close-dialog="closeDialog('edit')" 
     :table-id="tableId" 
  />

  <DialogReserve
    v-model:visible="visibleTableReserve"
    @close-dialog="closeDialog('reserve')"
    :table-id="tableId"
  />

  <DialogCancelReserve
    v-model:visible="visibleTableCancelReserve"
    @close-dialog="closeDialog('cancelReserve')"
    :table-id="tableId"
    :reservation-id="reservationId"
  />
</template>

<script setup lang="js">

import { ref, onMounted, watch } from 'vue';
import { DataTable, Column, Button } from 'primevue';
import { useRoute } from 'vue-router';
import { useToastService } from '@/shared/ToastService';
import DialogCreate from '../dialog-table-create/DialogCreate.vue';
import DialogEdit from '../dialog-table-edit/DialogEdit.vue';
import DialogReserve from '@/components/dialog-reserve/DialogReserve.vue';
import { useTableService } from '@/services/api/TableService';
import { useStore } from 'vuex';
import DialogCancelReserve from '../dialog-reserve/DialogCancelReserve.vue';

const store = useStore();
const route = useRoute();
const tableService = useTableService();

const visibleTableEdit = ref(false);
const visibleTableReserve = ref(false);
const visibleTableCancelReserve = ref(false);
const visibleTableCreate = ref(false);

const tables = ref();
const { showToast } = useToastService();

const tableId = ref(0);
const reservationId = ref(0);

const editTable = (data) => {
  tableId.value = data.id;
  visibleTableEdit.value = true;
};

const reserve = (data) => {
  tableId.value = data.id
  visibleTableReserve.value = true;
}

const cancelReserve = (data) => {
  tableId.value = data.id
  reservationId.value = data.reservationId
  visibleTableCancelReserve.value = true;
}

const closeDialog = (dialog, args) => {
  if(dialog === 'create') visibleTableCreate.value = false;
  if(dialog === 'edit') visibleTableEdit.value = false;
  if(dialog === 'reserve') visibleTableReserve.value = false;
  if(dialog === 'cancelReserve') visibleTableCancelReserve.value = false;

  if(!args?.cancelEvent) loadDataTable();
}


const release = (id) => {
  tableService.Release({
    tableId: id
  }).then(_ => {
    showToast('success', 'Sucesso', 'Mesa liberada')
    loadDataTable()
  }).catch(err => { });
}

const loadDataTable = () => {
  tableService.GetByRestaurantId(store.state.restaurant.id).then(response => {
    tables.value = response.data.data;
  })
}

onMounted(() => {
  if(!route.params.id){
    store.commit('clearRestaurant')
  }
})

watch(() => store.state.restaurant.id, (newId, oldId) =>{
  loadDataTable()
})

</script>