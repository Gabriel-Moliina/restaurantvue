<template lang="html">
  <Toast />

  <div class="card">
    <DataTable :value="tables" tableStyle="min-width: 50rem">
      <Column field="identification" header="Mesa" bodyStyle="text-align:center" sortable ></Column>
      <Column field="capacity" header="Capacidade" bodyStyle="text-align:center" sortable ></Column>
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
      <label for="email" class="font-semibold w-24">Capacidade da mesa</label>
      <div class="col-md-12">
        <InputText v-model="tableEdit.capacity" id="email" class="flex-auto" autocomplete="off" />
      </div>
    </div>
    <div class="row m-2 justify-content-end">
      <div class="col-3">
        <Button type="button" label="Excluir" severity="danger" @click="visibleEdit = false" raised rounded
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
        <DatePicker id="datepicker-24h" v-model="datetime24h" showTime hourFormat="24" />
      </div>
    </div>
    <div class="row">
      <label for="email" class="font-semibold w-24">Email do cliente</label>
      <div class="col-md-12">
        <InputText v-model="customerEmail" id="email" class="flex-auto" autocomplete="off" />
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

</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import RestaurantService from '@/services/RestaurantService';
import { DataTable } from 'primevue';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { useRoute } from 'vue-router';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import ReservationService from '@/services/ReservationService';
import TableService from '@/services/TableService';

const toast = useToast();
const route = useRoute();
const visibleEdit = ref(false);
const visibleReserve = ref(false);
const tables = ref();
const dialogEditHeader = ref('');
const dialogReserveHeader = ref('');
const customerEmail = ref('');
const datetime24h = ref();

const id = route.params.id;

const tableEdit = ref({
  capacity: 0,
  id: 0,
  identification: "",
  restaurantId: 0,
  reserved: 0
})

const editTable = (data) => {
  dialogEditHeader.value = 'Editar mesa ' + data.identification
  visibleEdit.value = true;
  tableEdit.value = { ...data }
};

const confirmEdit = () => {
  const table = {
    capacity: tableEdit.value.capacity,
    id: tableEdit.value.id,
    identification: tableEdit.value.identification,
    restaurantId: tableEdit.value.restaurantId,
  }

  TableService.Create(table)
    .then(response => {
      showToast('success', "Sucesso", 'Mesa cadastrada com sucesso!');
      visibleReserve.value = false;
      loadDataTable();
    })
    .catch(err => {
      showToast('error', "Algo deu errado", err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
    })
  visibleEdit.value = false;
}

const reserve = (data) => {
  dialogReserveHeader.value = 'Reservar mesa ' + data.identification
  visibleReserve.value = true;
  tableEdit.value = { ...data }
}

const confirmReserve = () => {
  ReservationService.Create(tableEdit.value.id, datetime24h.value, customerEmail.value)
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
  ReservationService.Cancel(tableId)
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
  TableService.Release({
    tableId: id
  }).then(response => {
    showToast('success', 'Sucesso', 'Mesa liberada')
    loadDataTable()
  }).catch(err => {
    showToast('error', "Algo deu errado", err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
  });
}

const showToast = (severity, info, detail) => {
  toast.add({ severity, summary: info, detail, life: 3000 });
}

const loadDataTable = () => {
  RestaurantService.GetById(id).then(response => {
    tables.value = response.data.data.tables;
  })
}

onMounted(() => {
  loadDataTable()
})

</script>