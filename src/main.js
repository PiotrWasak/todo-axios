import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import Vuex from "vuex";
import axios from "axios";

axios.defaults.baseURL =
  "https://todo-5c9df-default-rtdb.europe-west1.firebasedatabase.app";

const firebaseConfig = {
  apiKey: "AIzaSyDNekCx6eKdafhXqLcD8IZ2egQ_tGmHzW4",
  authDomain: "todo-5c9df.firebaseapp.com",
  databaseURL:
    "https://todo-5c9df-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-5c9df",
  storageBucket: "todo-5c9df.appspot.com",
  messagingSenderId: "362259266777",
  appId: "1:362259266777:web:c491edd73c751a9ddbd2c8",
};

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
