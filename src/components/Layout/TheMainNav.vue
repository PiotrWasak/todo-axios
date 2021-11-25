<template>
  <div>
    <profile-menu :is-visible="isProfileMenuVisible"></profile-menu>
    <v-system-bar>
      {{ date }}
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">
        Signed in as: {{ user.email }}
        <v-btn @click="logout" text>Sign out</v-btn>
      </div>
      <div v-else>Not signed in.</div>
    </v-system-bar>

    <v-app-bar dark>
      <v-app-bar-nav-icon
        v-if="isLoggedIn"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <router-link to="/"
        ><v-toolbar-title to="/">TODO</v-toolbar-title></router-link
      >

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn @click="toggleProfileMenu" icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-if="isLoggedIn"
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list nav dense>
        <v-list-item-group>
          <router-link to="/tasks">
            <v-list-item>
              <v-list-item-title>Tasks</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/profile">
            <v-list-item>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProfileMenu from "@/components/UI/ProfileMenu";

export default {
  name: "TheMainNav",
  components: { ProfileMenu },
  data() {
    return {
      isLoggedIn: false,
      drawer: false,
      isMagnifiedClicked: false,
      isProfileMenuVisible: false,
    };
  },
  methods: {
    async getUserData() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });
    },
    toggleProfileMenu() {
      this.isProfileMenuVisible = !this.isProfileMenuVisible;
    },
    logout() {
      getAuth()
        .signOut()
        .then(() => {
          console.log("Signed out succesfully!");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    date() {
      return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>
<style scoped>
a {
  color: white;
}
a:visited {
  color: white;
}
</style>
