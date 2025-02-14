<template>
    <Dialog v-on:show="loadTable" modal :header="dialogHeader" :style="{ width: '25rem' }">
        <form @submit.prevent="confirmEdit">
            <div class="row mb-4" style="margin-top: 20px;">
                <div class="col-md-12">
                    <FloatLabel>
                        <InputText id="identification" v-model="tableEdit.identification" class="flex-auto"
                            autocomplete="off" />
                        <label for="identification">Nome do Restaurante</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-12">
                    <FloatLabel>
                        <InputText v-model="tableEdit.capacity" id="capacity" class="flex-auto" autocomplete="off" />
                        <label for="capacity">Capacidade da mesa</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row m-2">
                <div class="col-12 d-flex text-center justify-content-between">
                    <Button type="button" label="Cancelar" severity="secondary"
                        @click="$emit('closeDialog', { cancelEvent: true })" raised rounded size="small"></Button>
                    <div>
                        <Button style="margin-right: 14px;" type="button" label="Excluir" severity="danger"
                            @click="deleteTable()" raised rounded size="small"></Button>
                        <Button type="submit" label="Salvar" raised rounded size="small"></Button>
                    </div>
                </div>
            </div>
        </form>
    </Dialog>
</template>

<script setup lang="js">
import { Dialog, Button, InputText, FloatLabel } from 'primevue';
import { ref } from 'vue'
import { useTableService } from '@/services/api/TableService';
import { useToastService } from '@/shared/ToastService'
import { useStore } from 'vuex';

const tableService = useTableService();
const store = useStore();
const { showToast } = useToastService();
const emit = defineEmits(['closeDialog']);
const props = defineProps({
    tableId: Number
})

const dialogHeader = ref('');

const tableEdit = ref({
    capacity: 0,
    id: 0,
    identification: '',
    restaurantId: store.state.restaurant.id,
    reserved: 0
})

const confirmEdit = () => {
    const table = {
        capacity: tableEdit.value.capacity,
        id: tableEdit.value.id,
        identification: tableEdit.value.identification,
        restaurantId: store.state.restaurant.id,
    }

    tableService.Create(table)
        .then(_ => {
            showToast('success', 'Sucesso', 'Mesa editada');
            emit('closeDialog')
        })
        .catch(err => {
            showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
        })
}

const deleteTable = () => {
    tableService.Delete(tableEdit.value.id)
        .then(_ => {
            showToast('success', 'Sucesso', 'Mesa excluída')
            emit('closeDialog');
        }).catch(err => {
            showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
        });
}

const loadTable = () => {
    tableService.GetById(props.tableId)
        .then(({ data }) => {
            tableEdit.value = data.data
            dialogHeader.value = 'Editar mesa ' + tableEdit.value.identification
        }).catch(err => {
            showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
        });
}

</script>

<style scoped></style>