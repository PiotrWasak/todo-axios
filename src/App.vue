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
import MainNav from "./components/TheMainNav.vue";
export default {
  components: { MainNav },
  name: "App",

  data: () => ({
    isLoggedIn: false,
  }),
};
</script>

<style>
a{
  text-decoration: none;
}
</style>
