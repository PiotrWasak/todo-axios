<template>
  <v-container>
    <v-row>
      <v-col> Login: </v-col>
      <v-col>
        {{ userData.email }}
      </v-col>
    </v-row>
    <v-row>
      <v-col> {{ emailVerifyText }} </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { userDataMixin } from "@/mixins/userDataMixin";

export default {
  name: "Profile",
  mixins: [userDataMixin],
  data() {
    return {};
  },
  computed: {
    emailVerifyText() {
      if (this.userData.emailVerified) {
        return "Your e-mail has been verified";
      } else {
        return "Please verify your e-mail";
      }
    },
  },
};
</script>

<style></style>
