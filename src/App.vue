<template>
  <v-app>
    <the-main-nav></the-main-nav>
    <v-main>
      <v-container>
        <keep-alive>
          <router-view :key="$route.fullPath" />
        </keep-alive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TheMainNav from "@/components/Layout/TheMainNav";
export default {
  components: { TheMainNav },
  name: "App",

  data: () => ({
    isLoggedIn: false,
  }),
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
