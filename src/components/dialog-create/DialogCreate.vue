<template>
    <Dialog v-on:show="tableCreate = {}" modal header="Criar nova mesa" :style="{ width: '25rem' }">
        <div class="row">
            <label for="identification" class="font-semibold w-24">Identificação da mesa</label>
            <div class="col-md-12">
                <InputText v-model="tableCreate.identification" id="identification" class="flex-auto"
                    autocomplete="off" />
            </div>
        </div>
        <div class="row">
            <label for="capacity" class="font-semibold w-24">Capacidade</label>
            <div class="col-md-12">
                <InputNumber v-model="tableCreate.capacity" id="capacity" class="flex-auto" autocomplete="off" />
            </div>
        </div>
        <div class="row m-2 justify-content-end">
            <div class="col-3">
                <Button type="button" label="Cancelar" severity="secondary"
                    @click="$emit('closeDialog', { cancelEvent: true })" raised rounded size="small"></Button>
            </div>
            <div class="col-3">
                <Button type="button" label="Criar" @click="confirmCreateTable()" raised rounded size="small"></Button>
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="js">

import { useRoute } from 'vue-router';
import { ref } from 'vue'
import { InputNumber, Button, Dialog, InputText } from 'primevue';
import { useTableService } from '@/services/TableService';
import { useToastService } from '@/shared/ToastService';

const route = useRoute();
const tableService = useTableService();
const { showToast } = useToastService();

const tableCreate = ref({
    identification: '',
    capacity: '',
    restaurantId: 0
});

const emit = defineEmits(['closeDialog'])

const confirmCreateTable = () => {
    const table = {
        identification: tableCreate.value.identification,
        capacity: tableCreate.value.capacity,
        restaurantId: route.params.id
    };

    tableService.Create(table)
        .then(response => {
            showToast('success', 'Sucesso', 'Mesa cadastrada com sucesso')
            emit('closeDialog')
        }).catch(err => {
            showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
        });
}

</script>