<template>
    <Dialog v-on:show="loadRestaurant" modal :header="dialogHeader" :style="{ width: '25rem' }">
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
            <div class="col-2">
                <Button type="button" label="Salvar" @click="confirmCreate()" raised rounded size="small"></Button>
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="js">
import { Dialog, InputText, Button } from 'primevue';
import { ref } from 'vue'
import { useRestaurantService } from '@/services/RestaurantService';
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
            showToast('success', 'Sucesso', 'Restaurante criado com sucesso');
            emit('closeDialog')
        }).catch(err => {
            showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
        });
}

const resetForm = () => {
    dialogHeader.value = 'Criar novo restaurante';
    restaurantName.value = '';
}

const loadRestaurant = () => {
    if (props.restaurantId == 0) {
        resetForm();
        return;
    }

    restaurantService.GetById(props.restaurantId)
        .then(({ data }) => {
            restaurantName.value = data.data?.name ?? ""
            dialogHeader.value = 'Editar restaurante';


        }).catch(err => {
            showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
        });
}

</script>
