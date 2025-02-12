<template lang="html">
  <div class="row justify-content-end mb-2">
    <div class="col-1 text-end">
      <Button severity="contrast" icon="pi pi-plus" @click="visibleTableCreate = true" />
    </div>
  </div>
  <div class="card">
    <DataTable :value="tables" tableStyle="min-width: 50rem" scrollable scrollHeight="500px">
      <Column field="identification" header="Mesa" bodyStyle="text-align:center" sortable></Column>
      <Column field="capacity" header="Capacidade" bodyStyle="text-align:center" sortable></Column>
      <Column header="Editar" bodyStyle="text-align:center">
        <template #body="row">
          <Button severity="contrast" icon="pi pi-pencil" @click="editTable(row.data)" />
        </template>
      </Column>
      <Column header="Reservar" bodyStyle="text-align:center">
        <template #body="row">
          <Button v-if="!row.data.reserved" severity="success" icon="pi pi-calendar-clock" @click="reserve(row.data)" />
          <Button v-if="row.data.reserved" severity="danger" icon="pi pi-calendar-clock"
            @click="cancelReserve(row.data.id)" />
        </template>
      </Column>
      <Column header="Liberar" bodyStyle="text-align:center">
        <template #body="row">
          <Button v-if="row.data.reserved" severity="info" icon="pi pi-check" @click="release(row.data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>


  <Dialog v-model:visible="visibleEdit" modal :header="dialogEditHeader" :style="{ width: '25rem' }">
    <div class="row">
      <label for="identification" class="font-semibold w-24">Identificação da mesa</label>
      <div class="col-md-12">
        <InputText id="identification" v-model="tableEdit.identification" class="flex-auto" autocomplete="off" />
      </div>
    </div>
    <div class="row">
      <label for="capacity" class="font-semibold w-24">Capacidade da mesa</label>
      <div class="col-md-12">
        <InputText v-model="tableEdit.capacity" id="capacity" class="flex-auto" autocomplete="off" />
      </div>
    </div>
    <div class="row m-2 justify-content-end">
      <div class="col-3">
        <Button type="button" label="Excluir" severity="danger" @click="deleteTable()" raised rounded
          size="small"></Button>
      </div>
      <div class="col-3">
        <Button type="button" label="Cancelar" severity="secondary" @click="visibleEdit = false" raised rounded
          size="small"></Button>
      </div>
      <div class="col-3">
        <Button type="button" label="Salvar" @click="confirmEdit()" raised rounded size="small"></Button>
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="visibleReserve" modal :header="dialogReserveHeader" :style="{ width: '25rem' }">
    <div class="row">
      <label for="identification" class="font-semibold w-24">Selecione um horário</label>
      <div class="col-md-12">
        <DatePicker id="datepicker-24h" v-model="datetime24h" showTime dateFormat="dd/mm/yy" hourFormat="24" />
      </div>
    </div>
    <div class="row">
      <label for="email" class="font-semibold w-24">Email do cliente</label>
      <div class="col-md-12">
        <InputText fluid v-model="customerEmail" id="email" class="flex-auto" autocomplete="off" />
      </div>
    </div>
    <div class="row m-2 justify-content-end">
      <div class="col-3">
        <Button type="button" label="Cancelar" severity="secondary" @click="visibleReserve = false" raised rounded
          size="small"></Button>
      </div>
      <div class="col-3">
        <Button type="button" label="Reservar" @click="confirmReserve()" raised rounded size="small"></Button>
      </div>
    </div>
  </Dialog>

  <DialogCreate v-model:visible="visibleTableCreate" />
</template>

<script setup lang="js">

import { ref, onMounted } from 'vue';
import { useRestaurantService } from '@/services/RestaurantService';
import { DataTable, Column, Button, Dialog, InputText, DatePicker, InputNumber } from 'primevue';
import { useRoute } from 'vue-router';
import { useReservationService } from '@/services/ReservationService';
import { useToastService } from '@/shared/ToastService';
import DialogCreate from './dialog-create/DialogCreate.vue';
import { useTableService } from '@/services/TableService';

const route = useRoute();

const restaurantId = route.params.id;

const visibleEdit = ref(false);
const visibleReserve = ref(false);
const visibleTableCreate = ref(false);

const tables = ref();
const { showToast } = useToastService();

const dialogEditHeader = ref('');
const dialogReserveHeader = ref('');

const customerEmail = ref('');
const datetime24h = ref();

const tableEdit = ref({
  capacity: 0,
  id: 0,
  identification: "",
  restaurantId: restaurantId,
  reserved: 0
})

const editTable = (data) => {
  dialogEditHeader.value = 'Editar mesa ' + data.identification
  visibleEdit.value = true;
  tableEdit.value = { ...data }
};

const tableService = useTableService();
const reservationService = useReservationService();
const restaurantService = useRestaurantService();

const confirmEdit = () => {
  const table = {
    capacity: tableEdit.value.capacity,
    id: tableEdit.value.id,
    identification: tableEdit.value.identification,
    restaurantId: tableEdit.value.restaurantId,
  }
  
  tableService.Create(table)
    .then(response => {
      showToast('success', "Sucesso", 'Mesa editada com sucesso!');
      visibleEdit.value = false;
      loadDataTable();
    })
    .catch(err => {
      showToast('error', "Algo deu errado", err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
    })
}

const reserve = (data) => {
  customerEmail.value = '';
  datetime24h.value = new Date().toString();
  dialogReserveHeader.value = 'Reservar mesa ' + data.identification
  visibleReserve.value = true;
  tableEdit.value = { ...data }
}

const confirmReserve = () => {
  reservationService.Create(tableEdit.value.id, datetime24h.value, customerEmail.value)
    .then(response => {
      showToast('success', "Sucesso", "Mesa reservada!")
      visibleReserve.value = false;
      loadDataTable();
    })
    .catch(err => {
      showToast('error', "Algo deu errado", err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
    })
}

const cancelReserve = (tableId) => {
  reservationService.Cancel(tableId)
    .then(response => {
      showToast('success', "Sucesso", "A reserva foi cancelada!")
      visibleReserve.value = false;
      loadDataTable();
    })
    .catch(err => {
      showToast('error', "Algo deu errado", err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
    });
}

const release = (id) => {
  tableService.Release({
    tableId: id
  }).then(response => {
    showToast('success', 'Sucesso', 'Mesa liberada')
    loadDataTable()
  }).catch(err => {
    showToast('error', "Algo deu errado", err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
  });
}

const deleteTable = () => {
  tableService.Delete(tableEdit.value.id)
    .then(response => {
      showToast('success', 'Sucesso', 'Mesa excluída com sucesso')
      visibleEdit.value = false;
      loadDataTable()
    }).catch(err => {
      showToast('error', "Algo deu errado", err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
    });
}

const showCreateTable = () => {
  tableCreate.value = {}
  visibleTableCreate.value = true;
}

const loadDataTable = () => {
  restaurantService.GetById(restaurantId).then(response => {
    tables.value = response.data.data.tables;
  })
}

onMounted(() => {
  loadDataTable()
})

</script>