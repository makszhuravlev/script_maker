import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router'
import "./assets/main.css";

import App from "./App.vue";
import Editor from './Editor.vue'
import main from "./EmployeePage.vue"
import auth from "./auth.vue"
import read from './reader.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/editor/:id', component: Editor },
        { path: '/main', component: main},
        {path: '/', component: auth},
        {path: '/reader/:id', component: read}
    ]
});


const app = createApp(App)

app.use(router);

app.mount('#app')
