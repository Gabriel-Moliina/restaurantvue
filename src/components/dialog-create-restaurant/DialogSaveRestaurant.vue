<template>
    <Dialog v-on:show="loadRestaurant" modal :header="dialogHeader" :style="{ width: '25rem' }">
        <form @submit.prevent="confirmCreate">
            <div class="row mb-4" style="margin-top: 20px;">
                <div class="col-md-12">
                    <FloatLabel>
                        <InputText fluid v-model="restaurantName" id="name-restaurant" class="flex-auto"
                            autocomplete="off" />
                        <label for="name-restaurant">Nome do Restaurante</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row m-2 justify-content-between">
                <div class="col-3 text-center">
                    <Button type="button" label="Cancelar" severity="secondary"
                        @click="$emit('closeDialog', { cancelEvent: false })" raised rounded size="small"></Button>
                </div>
                <div class="col-3 text-center">
                    <Button type="submit" label="Salvar" raised rounded size="small"></Button>
                </div>
            </div>
        </form>
    </Dialog>
</template>

<script setup lang="js">
import { Dialog, InputText, Button, FloatLabel } from 'primevue';
import { ref } from 'vue'
import { useRestaurantService } from '@/services/api/RestaurantService';
import { useToastService } from '@/shared/ToastService';

const restaurantService = useRestaurantService();
const restaurantName = ref('');
const dialogHeader = ref('');
const { showToast } = useToastService();
const emit = defineEmits(['closeDialog'])

const props = defineProps(['restaurantId'])

const confirmCreate = () => {
    restaurantService.Create({ id: props.restaurantId, name: restaurantName.value })
        .then(() => {
            if(props.restaurantId == 0)
                showToast('success', 'Sucesso', 'Restaurante criado');
            else
                showToast('success', 'Sucesso', 'Restaurante editado');
            emit('closeDialog')
        }).catch(err => { });
}

const resetForm = () => {
    dialogHeader.value = 'Criar novo restaurante';
    restaurantName.value = '';
}

const loadRestaurant = () => {
    if (!props.restaurantId) {
        resetForm();
        return;
    }

    restaurantService.GetById(props.restaurantId)
        .then(({ data }) => {
            restaurantName.value = data.data?.name ?? ""
            dialogHeader.value = 'Editar restaurante';


        }).catch(err => { });
}
</script>
