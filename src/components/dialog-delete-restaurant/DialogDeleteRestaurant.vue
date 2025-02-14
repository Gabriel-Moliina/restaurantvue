<template>
    <Dialog v-on:show="loadRestaurant" modal header="Confirmar exclusão" :style="{ width: '25vw' }">
        <form @submit.prevent="confirmCreate">
            <div class="row mb-5">
                <p class="m-0">
                    Deseja excluir o restaurante "{{ restaurantName }}"
                </p>
            </div>
            <div class="row m-2 justify-content-between">
                <div class="col-3 text-center">
                    <Button type="button" label="Cancelar" severity="secondary"
                        @click="$emit('closeDialog', { cancelEvent: false })" raised rounded size="small"></Button>
                </div>
                <div class="col-3 text-center">
                    <Button type="submit" label="Excluir" severity="danger" raised rounded size="small"></Button>
                </div>
            </div>
        </form>
    </Dialog>
</template>

<script setup lang="js">
import { Dialog, Button } from 'primevue';
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
    restaurantService.Delete(props.restaurantId)
        .then(() => {
            showToast('success', 'Sucesso', 'Restaurante excluído');
            emit('closeDialog')
        }).catch(err => {
            showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
        });
}

const loadRestaurant = () => {
    restaurantService.GetById(props.restaurantId)
        .then(({ data }) => {
            restaurantName.value = data.data?.name ?? ""
            dialogHeader.value = 'Editar restaurante';


        }).catch(err => {
            showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
        });
}
</script>

<style scoped></style>