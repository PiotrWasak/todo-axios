import Vue from "vue";
import VueRouter from "vue-router";
import Profile from "@/views/Profile";
import Todos from "@/views/Todos";
import Auth from "@/views/Auth";
import Register from "@/views/Register";
import Login from "@/views/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NotFound from "@/views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Auth",
    component: Auth,
    meta: {
      subtitle: "Auth",
    },
    beforeEnter(to, from, next) {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          next("/tasks");
        } else {
          next("/login");
        }
      });
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      subtitle: "Register",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      subtitle: "Login",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { subtitle: "Profile", requiresAuth: true },
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: Todos,
    meta: { subtitle: "List", requiresAuth: true },
  },
  {
    path: "/*",
    name: "Not Found",
    component: NotFound,
    meta: { subtitle: "Not found" },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const pageTitle = "TODO";
  document.title = `${pageTitle} - ${to.meta.subtitle}`;

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = getAuth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});
export default router;
