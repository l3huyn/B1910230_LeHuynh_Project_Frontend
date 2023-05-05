import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/main.css";
import VueCookies from "vue-cookies";
import router from "./router";
const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(VueCookies);
app.mount("#app");