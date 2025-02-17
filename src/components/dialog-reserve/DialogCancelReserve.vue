<template>
    <Dialog v-on:show="onShow" modal :header="dialogHeader" :style="{ width: '25rem' }">
        <form @submit.prevent="cancelReserve">
            <div class="row mb-4" style="margin-top: 20px;">
                <div class="col-md-12">
                    <FloatLabel>
                    <DatePicker disabled  showIcon id="datepicker-24h" v-model="datetime24h" showTime dateFormat="dd/mm/yy"
                        hourFormat="24" iconDisplay="input" />
                        <label for="email">Data da reserva</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-12">
                    <FloatLabel>
                        <InputText disabled  fluid v-model="customerEmail" id="email" class="flex-auto" autocomplete="off" />
                        <label for="email">Email do cliente</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row m-2 justify-content-between">
                <div class="col-3 text-center">
                    <Button type="button" label="Cancelar" severity="secondary"
                        @click="$emit('closeDialog', { cancelEvent: false })" raised rounded size="small"></Button>
                </div>
                <div class="col-5 text-center">
                    <Button type="submit" severity="danger" label="Cancelar Reserva" raised rounded size="small"></Button>
                </div>
            </div>
        </form>
    </Dialog>
</template>

<script setup lang="js">
import { Dialog, DatePicker, InputText, Button, FloatLabel } from 'primevue';
import { ref } from 'vue'
import { useReservationService } from '@/services/api/ReservationService';
import { useToastService } from '@/shared/ToastService';

const reservationService = useReservationService();
const dialogHeader = ref('');
const customerEmail = ref('');
const datetime24h = ref();
const { showToast } = useToastService();

const emit = defineEmits(['closeDialog'])

const props = defineProps({
    tableId: Number,
    reservationId: Number
})


const onShow = () => {
    reservationService.GetById(props.reservationId)
        .then(({ data }) => {
            customerEmail.value = data.data.email;
            datetime24h.value = new Date(data.data.date);
            dialogHeader.value = 'Reserva da mesa ' + `"${data.data.identification}"`
        }).catch(err => { });
}

const cancelReserve = () => {
    reservationService.Cancel(props.reservationId)
        .then(_ => {
            showToast('success', 'Sucesso', 'A reserva foi cancelada!')
            emit('closeDialog');
        })
        .catch(err => { });
}
</script>

<style scoped></style>