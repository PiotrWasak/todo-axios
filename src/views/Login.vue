<template>
  <v-container class="loginContainer">
    <v-form ref="form" v-model="loginValid">
      <v-row>
        <v-col>
          <v-text-field
            @keydown.enter.prevent="loginUser"
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
            @keydown.enter.prevent="loginUser"
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
            @click.prevent="loginUser"
            :disabled="!loginValid"
            color="primary"
            align="center"
            >Log in</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-row><v-col align="center"><v-btn  @click="googleSignIn"><v-icon>mdi-google</v-icon>Sign in with google</v-btn></v-col></v-row>
    <v-row
      ><v-col align="center"
        ><p class="text-caption">Don't have an account?</p> <v-btn small color="secondary" to="register"
    > Register</v-btn
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
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider  } from "firebase/auth";

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
    googleSignIn() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      signInWithPopup(auth, provider).then(() => {
        this.$router.push('/tasks')
      }).catch(error => {
        console.log(error);
      });
    }
  },
};
</script>

<style scoped>
.loginContainer {
  margin-top: 20vh;
  width: 60%;
}
</style>
