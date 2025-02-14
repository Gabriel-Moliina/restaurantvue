<template>
    <Dialog v-on:show="loadTable" modal :header="dialogHeader" :style="{ width: '25rem' }">
        <form @submit.prevent="confirmEdit">
            <div class="row">
                <label for="identification" class="font-semibold w-24">Identificação da mesa</label>
                <div class="col-md-12">
                    <InputText id="identification" v-model="tableEdit.identification" class="flex-auto"
                        autocomplete="off" />
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
                    <Button type="button" label="Cancelar" severity="secondary"
                        @click="$emit('closeDialog', { cancelEvent: true })" raised rounded size="small"></Button>
                </div>
                <div class="col-3">
                    <Button type="submit" label="Salvar" raised rounded size="small"></Button>
                </div>
            </div>
        </form>
    </Dialog>
</template>

<script setup lang="js">
import { Dialog, Button, InputText } from 'primevue';
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import { useTableService } from '@/services/api/TableService';
import { useToastService } from '@/shared/ToastService';

const route = useRoute();
const restaurantId = ref(route.params.id);
const tableService = useTableService();
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
    restaurantId: restaurantId.value,
    reserved: 0
})

const confirmEdit = () => {
    const table = {
        capacity: tableEdit.value.capacity,
        id: tableEdit.value.id,
        identification: tableEdit.value.identification,
        restaurantId: tableEdit.value.restaurantId,
    }

    tableService.Create(table)
        .then(response => {
            showToast('success', 'Sucesso', 'Mesa editada com sucesso!');
            emit('closeDialog')
        })
        .catch(err => {
            showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
        })
}

const deleteTable = () => {
    tableService.Delete(tableEdit.value.id)
        .then(response => {
            showToast('success', 'Sucesso', 'Mesa excluída com sucesso')
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