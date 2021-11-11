<template>
  <v-container class="loginContainer">
    <v-form ref="form" v-model="loginValid">
      <v-row>
        <v-col>
          <v-text-field
            v-model="emailValue"
            label="E-mail"
            :rules="emailRules"
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
          <v-btn @click="loginUser" :disabled="!loginValid" color="primary" align="center">Log in</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-row><v-col color="secondary" align="center"><v-btn to="register">Don't have an account? Register!</v-btn></v-col></v-row>
  </v-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      loginValid: true,
      emailValue: '',
      passwordValue: '',
      emailRules: [],
      passwordRules: [],
    }
  },
  methods: {
    loginUser(){
      const auth=getAuth();
      signInWithEmailAndPassword(auth, this.emailValue, this.passwordValue).then((userCredential) =>{
        console.log(userCredential);
        this.$router.push("/tasks").catch(() => console.log('error'));
      }).catch((error) => {
        console.log(error.code);
        console.log(error.message);
      })
    }
  }
};
</script>

<style scoped>
.loginContainer {
  margin-top: 20vh;
  width: 60%;
}
</style>