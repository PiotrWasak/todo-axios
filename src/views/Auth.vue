<template>
  <v-container class="loginContainer">
    <v-form ref="form" v-model="taskValid">
      <v-row>
        <v-col>
          <v-text-field
            v-model="loginValue"
            label="Login"
            :counter="50"
            :rules="loginRules"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="passwordValue"
            label="Password"
            :counter="20"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-btn @click="logIn" color="primary" align="center">Log in</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "Auth",
  methods: {
    logIn() {
      this.$router.push("/tasks");
    },
  },
};
</script>

<style scoped>
.loginContainer {
  margin-top: 20vh;
  width: 60%;
}
</style>
