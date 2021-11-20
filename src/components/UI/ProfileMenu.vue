<template>
  <v-card v-if="isVisible" class="profileMenu">
    <v-container>
    <v-row><v-col><v-icon>mdi-playlist-check</v-icon></v-col><v-col><v-btn text>Sign out</v-btn></v-col></v-row>

    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "ProfileMenu",
  props: {
    userData: Object,
    isVisible: Boolean,
  }
};
</script>

<style scoped>
.profileMenu {
  position: fixed;
  top: 80px;
  right: 5px;
  z-index: 1;
}
</style>