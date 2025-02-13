<template>
    <Dialog :onshow="restaurantName = ''" modal header="Criar novo restaurante" :style="{ width: '25rem' }">
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
                <Button type="button" label="Criar" @click="confirmCreate()" raised rounded size="small"></Button>
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