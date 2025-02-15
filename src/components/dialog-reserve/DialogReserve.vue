<template>
    <Dialog v-on:show="onShow" modal :header="dialogHeader" :style="{ width: '25rem' }">
        <form @submit.prevent="confirmReserve">
            <div class="row mb-4">
                <div class="col-md-12">
                    <DatePicker showIcon id="datepicker-24h" v-model="datetime24h" showTime dateFormat="dd/mm/yy"
                        hourFormat="24" iconDisplay="input" />
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-12">
                    <FloatLabel>
                        <InputText fluid v-model="customerEmail" id="email" class="flex-auto" autocomplete="off" />
                        <label for="email">Email do cliente</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row m-2 justify-content-between">
                <div class="col-3 text-center">
                    <Button type="button" label="Cancelar" severity="secondary"
                        @click="$emit('closeDialog', { cancelEvent: false })" raised rounded size="small"></Button>
                </div>
                <div class="col-3 text-center">
                    <Button type="submit" label="Reservar" raised rounded size="small"></Button>
                </div>
            </div>
        </form>
    </Dialog>
</template>

<script setup lang="js">
import { Dialog, DatePicker, InputText, Button, FloatLabel } from 'primevue';
import { useTableService } from '@/services/api/TableService';
import { ref } from 'vue'
import { useReservationService } from '@/services/api/ReservationService';
import { useToastService } from '@/shared/ToastService';

const tableService = useTableService();
const reservationService = useReservationService();
const dialogHeader = ref('');
const customerEmail = ref('');
const datetime24h = ref();
const { showToast } = useToastService();

const emit = defineEmits(['closeDialog'])

const props = defineProps({
    tableId: Number
})

const clearForm = () => {
    customerEmail.value = '';
    datetime24h.value = new Date();
};

const onShow = () => {
    clearForm();
    tableService.GetById(props.tableId)
        .then(({ data }) => {
            dialogHeader.value = 'Reservar mesa ' + data.data.identification
        }).catch(err => { });
}

const confirmReserve = () => {
    reservationService.Create(props.tableId, datetime24h.value.toISOString(), customerEmail.value)
        .then(_ => {
            showToast('success', 'Sucesso', 'Mesa reservada!')
            emit('closeDialog')
        })
        .catch(err => {})
}
</script>

<style scoped></style>