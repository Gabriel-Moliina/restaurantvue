<template>
    <Dialog v-on:show="tableCreate = {}" modal header="Criar nova mesa" :style="{ width: '25rem' }">
        <form @submit.prevent="confirmCreateTable">
            <div class="row mb-4" style="margin-top: 20px;">
                <div class="col-md-12">
                    <FloatLabel>
                        <InputText fluid v-model="tableCreate.identification" id="identification" class="flex-auto"
                            autocomplete="off" />
                        <label for="identification">Identificação da mesa</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-12">
                    <FloatLabel>
                        <InputNumber v-model="tableCreate.capacity" id="capacity" class="flex-auto"
                            autocomplete="off" />
                        <label for="capacity">Capacidade</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row m-2 justify-content-between">
                <div class="col-3 text-center">
                    <Button type="button" label="Cancelar" severity="secondary"
                        @click="$emit('closeDialog', { cancelEvent: true })" raised rounded size="small"></Button>
                </div>
                <div class="col-3 text-center">
                    <Button type="submit" label="Criar" raised rounded size="small"></Button>
                </div>
            </div>
        </form>
    </Dialog>
</template>

<script setup lang="js">

import { ref } from 'vue'
import { InputNumber, Button, Dialog, InputText, FloatLabel } from 'primevue';
import { useTableService } from '@/services/api/TableService';
import { useToastService } from '@/shared/ToastService';
import { useStore } from 'vuex';

const store = useStore();
const tableService = useTableService();
const { showToast } = useToastService()

const tableCreate = ref({
    identification: '',
    capacity: '',
    restaurantId: store.state.restaurant.id
});

const emit = defineEmits(['closeDialog'])

const confirmCreateTable = () => {
    const table = {
        identification: tableCreate.value.identification,
        capacity: tableCreate.value.capacity ?? 0,
        restaurantId: store.state.restaurant.id
    };
    
    tableService.Create(table)
        .then(_ => {
            showToast('success', 'Sucesso', 'Mesa cadastrada')
            emit('closeDialog')
        }).catch(err => {});
}

</script>