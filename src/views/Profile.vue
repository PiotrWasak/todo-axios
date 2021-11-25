<template>
  <v-card>
    <v-card-title>Profile</v-card-title>
    <v-card-text class="profileContainer">
      <v-row>
        <v-col><v-icon color="primary">mdi-email</v-icon> E-mail </v-col>
        <v-col>
          {{ userData.email }}
        </v-col>
        <v-col> {{ emailVerifyText }} </v-col>
        <v-col v-if="!userData.emailVerified"
          ><v-btn @click="sendVerifyEmail"
            >Send verification e-mail</v-btn
          ></v-col
        >
      </v-row>
      <v-divider class="divider"></v-divider>
      <v-row>
        <v-col>
          <v-icon>mdi-lock</v-icon>
          Password
        </v-col>
        <v-col></v-col>
        <v-col><v-btn @click="sendPasswordReset">Reset password</v-btn></v-col>
      </v-row>
      <v-divider class="divider"></v-divider>
      <v-row>
        <v-col>Name</v-col>
        <v-col
          ><v-text-field label="First name" v-model="firstName"></v-text-field>
        </v-col>
        <v-col><v-text-field label="Last name"></v-text-field> </v-col>
      </v-row>
    </v-card-text>
    <v-snackbar v-model="snackbar.isActive" :timeout="snackbar.timeout">{{
      snackbar.text
    }}</v-snackbar>
  </v-card>
</template>
<script>
import { userDataMixin } from "@/mixins/userDataMixin";
import {
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

export default {
  name: "Profile",
  mixins: [userDataMixin],
  data() {
    return {
      snackbar: { isActive: false, text: null, timeout: 15000 },
    };
  },
  computed: {
    emailVerifyText() {
      if (this.userData.emailVerified) {
        return "Your e-mail has been verified";
      } else {
        return "Please verify your e-mail";
      }
    },
    firstName() {
      console.log(this.userData);
      return "";
    },
  },
  methods: {
    sendVerifyEmail() {
      sendEmailVerification(getAuth().currentUser)
        .then(() => {
          this.snackbar.text = "Verification email send";
          this.snackbar.isActive = true;
        })
        .catch((error) => {
          this.snackbar.text = error;
          this.snackbar.isActive = true;
        });
    },
    sendPasswordReset() {
      sendPasswordResetEmail(getAuth(), getAuth().currentUser.email)
        .then(() => {
          this.snackbar.text = "Password reset email send!";
          this.snackbar.isActive = true;
        })
        .catch((error) => {
          this.snackbar.text = error;
          this.snackbar.isActive = true;
        });
    },
  },
};
</script>

<style scoped>
.divider {
  margin-top: 20px;
  padding-top: 20px;
}

.profileContainer {
  padding-top: 1em;
}
</style>
