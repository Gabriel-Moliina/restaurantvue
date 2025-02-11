import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice';
import store from './store'

createApp(App).use(store).use(PrimeVue, {
    theme:{
        preset: Aura,
        options: {
            darkModeSelector: false || 'none',
        }
    }
})
.use(ToastService)
.use(router)
.mount('#app')
