<template>
  <v-app>
    <main-nav></main-nav>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MainNav from "./components/MainNav.vue";
export default {
  components: { MainNav },
  name: "App",

  data: () => ({
    isLoggedIn: false,
  }),
};
</script>
