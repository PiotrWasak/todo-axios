import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import Vuex from "vuex";
import axios from "axios";
import { firebaseConfig } from "@/utils/firebaseConfig";

axios.defaults.baseURL =
  "https://todo-5c9df-default-rtdb.europe-west1.firebasedatabase.app";

const fireBaseApp = initializeApp(firebaseConfig);

export const database = getDatabase(fireBaseApp);

Vue.use(Vuex);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
