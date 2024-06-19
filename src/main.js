import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router'
import "./assets/main.css";

import App from "./App.vue";
import Editor from './Editor.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/editor/:id', component: Editor },
    ]
});


const app = createApp(App)

app.use(router);

app.mount('#app')
