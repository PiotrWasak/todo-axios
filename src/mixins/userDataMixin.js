import { getAuth, onAuthStateChanged } from "firebase/auth";

export var userDataMixin = {
  data() {
    return {
      userData: {},
    };
  },
  methods: {
    getUserData() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.userData = user;
      });
    },
  },
  created() {
    this.getUserData();
  },
};
