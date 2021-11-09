import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Profile from "@/views/Profile";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    //import(/* webpackChunkName: "about" */ "@/views/Profile"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
