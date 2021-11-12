<template>
  <v-container class="loginContainer">
    <v-form ref="form" v-model="loginValid">
      <v-row>
        <v-col>
          <v-text-field
            v-model="emailValue"
            label="E-mail"
            type="email"
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
          <v-btn
            @click="loginUser"
            :disabled="!loginValid"
            color="primary"
            align="center"
            >Log in</v-btn
          >
        </v-col>
      </v-row>
    </v-form>

    <v-row
      ><v-col align="center"
        ><v-btn color="secondary" to="register"
          >Don't have an account? Register!</v-btn
        ></v-col
      ></v-row
    >

    <v-row>
      <v-col>
        <v-alert
          v-if="loginErrorText"
          class="text-center"
          dense
          elevation="5"
          type="error"
          transition="fab-transition"
          >{{ loginErrorText }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      loginValid: true,
      emailValue: "",
      passwordValue: "",
      emailRules: [(v) => !!v || "E-mail is required"],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length <= 20 || "Password must be less than 20 characters",
      ],
      loginErrorText: "",
    };
  },
  methods: {
    loginUser() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.emailValue, this.passwordValue)
        .then((userCredential) => {
          if (userCredential.user.emailVerified) {
            this.$router.push("/tasks").catch(() => console.log("error"));
          } else {
            this.loginErrorText = "Please verify your login";
          }
        })
        .catch((error) => {
          console.log(error);
          this.loginErrorText = error.code;
        });
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
