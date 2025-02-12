<template>
    <Dialog modal header="Criar novo restaurante" :style="{ width: '25rem' }">
        <div class="row mb-5">
            <label for="name-restaurant" class="font-semibold w-24">Nome do Restaurante</label>
            <div class="col-md-12">
                <InputText fluid v-model="restaurantName" id="name-restaurant" class="flex-auto" autocomplete="off" />
            </div>
        </div>
        <div class="row m-2 justify-content-end">
            <div class="col-3">
                <Button type="button" label="Cancelar" severity="secondary"
                    @click="$emit('closeDialog', { cancelEvent: false })" raised rounded size="small"></Button>
            </div>
            <div class="col-3">
                <Button type="button" label="Reservar" @click="confirmCreate()" raised rounded size="small"></Button>
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="js">
import { Dialog, InputText, Button } from 'primevue';
import { ref } from 'vue'
import { useRestaurantService } from '@/services/RestaurantService';
import { useToastService } from '@/shared/ToastService';

const restuarantService = useRestaurantService();
const restaurantName = ref('');
const { showToast } = useToastService();
const emit = defineEmits(['closeDialog'])

const confirmCreate = () => {
    restuarantService.Create(restaurantName.value)
        .then(() => {
            showToast('success', 'Sucesso', 'Restaurante criado com sucesso');
            emit('closeDialog')
        }).catch(err => {
            showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
        });
}
</script>
