<template>
  <v-container> </v-container>
</template>

<script>
//import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Auth",
  // data() {
  //   return {
  //     isLoggedIn: false,
  //   };
  // },
  // methods: {
  //   redirect() {
  //     if (this.isLoggedIn) {
  //       this.$router.push("/tasks").catch(() => {
  //         console.log("error");
  //       });
  //     } else {
  //       this.$router.push("/login");
  //     }
  //   },
  //   async getUserData() {
  //     const auth = getAuth();
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         this.isLoggedIn = true;
  //         this.redirect();
  //       } else {
  //         this.isLoggedIn = false;
  //         console.log("User not logged in");
  //         this.redirect();
  //       }
  //     });
  //   },
  // },
  // mounted() {
  //   this.getUserData();
  // },
};
</script>

<style scoped></style>
