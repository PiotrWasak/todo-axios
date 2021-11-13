<template>
  <v-container class="loginContainer">
    <v-form ref="form" v-model="registerValid">
      <v-row>
        <v-col>
          <v-text-field
            v-model="loginValue"
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
          <v-btn
            @click="registerUser"
            :disabled="!registerValid"
            color="primary"
            align="center"
            >Register</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-row
      ><v-col  align="center"
        ><v-btn small color="secondary" to="login">Already have an account? Log in!</v-btn></v-col
      ></v-row
    >
    <v-row>
      <v-col>
        <v-alert
          v-if="registerErrorText"
          class="text-center"
          dense
          elevation="5"
          type="error"
          transition="fab-transition"
          >{{ registerErrorText }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export default {
  name: "Auth",
  data() {
    return {
      registerValid: true,
      loginValue: "",
      passwordValue: "",
      registerErrorText: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) ||
          "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
        (v) => v.length <= 20 || "Password must be less than 20 characters",
      ],
    };
  },
  methods: {
    registerUser() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.loginValue, this.passwordValue)
        .then((userCredential) => {
          console.log(userCredential.user);
          sendEmailVerification(userCredential.user);
          this.$router.push("/tasks");
        })
        .catch((error) => {
          this.registerErrorText = error.code;
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
