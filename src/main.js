import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import axios from 'axios';
import VueAxios from "vue-axios";

const app = createApp(App);

app.config.productionTip = false;

app.use(VueAxios, axios)

app.mount('#app')
