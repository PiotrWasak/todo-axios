<!--<template>-->
<!--  <v-card>-->
<!--    <v-container>-->
<!--      <v-form ref="form" v-model="taskValid">-->
<!--        <v-row>-->
<!--          <v-col cols="12" md="11">-->
<!--            <v-text-field-->
<!--              ref="addTaskInput"-->
<!--              @keydown.enter.prevent="addTask"-->
<!--              v-model="taskValue"-->
<!--              label="Add task"-->
<!--              :counter="50"-->
<!--              :rules="taskRules"-->
<!--              required-->
<!--            ></v-text-field>-->
<!--          </v-col>-->
<!--          <v-col cols="12" md="1">-->
<!--            <v-fade-transition>-->
<!--              <v-btn-->
<!--                v-if="taskValid"-->
<!--                @click.prevent="addTask"-->
<!--                elevation="2"-->
<!--                fab-->
<!--                color="primary"-->
<!--              >-->
<!--                <v-icon dark> mdi-plus</v-icon>-->
<!--              </v-btn>-->
<!--            </v-fade-transition>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-form>-->

<!--      <v-list dense>-->
<!--        <v-subheader>TASKS</v-subheader>-->
<!--        <v-list-item-group v-model="selectedTask" color="primary">-->
<!--          <v-list-item-->
<!--            @click.right.prevent="openRightClickMenu"-->
<!--            v-for="task in taskList"-->
<!--            :key="task.uid"-->
<!--          >-->
<!--            <v-list-item-icon>-->
<!--              <v-icon-->
<!--                @click="updateDatabase(task.uid, 'done')"-->
<!--                v-text="listIcon"-->
<!--              ></v-icon>-->
<!--            </v-list-item-icon>-->
<!--            <v-list-item-content>-->
<!--              <v-list-item-title v-text="task.value"></v-list-item-title>-->
<!--            </v-list-item-content>-->
<!--            <v-spacer></v-spacer>-->
<!--            <v-list-item-icon>-->
<!--              <v-icon-->
<!--                @click="deleteFromDatabase(task.uid)"-->
<!--                v-text="ListIconDelete"-->
<!--              ></v-icon>-->
<!--            </v-list-item-icon>-->
<!--          </v-list-item>-->
<!--        </v-list-item-group>-->
<!--      </v-list>-->

<!--      <v-list dense>-->
<!--        <v-subheader>DONE</v-subheader>-->
<!--        <v-list-item-group v-model="selectedDoneTask" color="primary">-->
<!--          <v-list-item-->
<!--            @click.right.prevent="openRightClickMenu"-->
<!--            v-for="task in doneTaskList"-->
<!--            :key="task.uid"-->
<!--          >-->
<!--            <v-list-item-icon>-->
<!--              <v-icon-->
<!--                @click="updateDatabase(task.uid, 'todo')"-->
<!--                v-text="ListIconDone"-->
<!--              ></v-icon>-->
<!--            </v-list-item-icon>-->
<!--            <v-list-item-content>-->
<!--              <v-list-item-title-->
<!--                class="taskDone"-->
<!--                v-text="task.value"-->
<!--              ></v-list-item-title>-->
<!--            </v-list-item-content>-->
<!--            <v-spacer></v-spacer>-->
<!--            <v-list-item-icon>-->
<!--              <v-icon-->
<!--                @click="deleteFromDatabase(task.uid)"-->
<!--                v-text="ListIconDoneDelete"-->
<!--              ></v-icon>-->
<!--            </v-list-item-icon>-->
<!--          </v-list-item>-->
<!--        </v-list-item-group>-->
<!--      </v-list>-->
<!--    </v-container>-->

<!--    <v-menu-->
<!--      v-model="showMenu"-->
<!--      :position-x="x"-->
<!--      :position-y="y"-->
<!--      absolute-->
<!--      offset-y-->
<!--    >-->
<!--      <v-list>-->
<!--        <v-list-item class="rightClickMenu">-->
<!--          <v-list-item-icon-->
<!--            ><v-icon>mdi-clipboard-edit-outline</v-icon></v-list-item-icon-->
<!--          >-->
<!--          <v-list-item-title-->
<!--            ><v-text-field autofocus> </v-text-field-->
<!--          ></v-list-item-title>-->
<!--        </v-list-item>-->
<!--      </v-list>-->
<!--    </v-menu>-->
<!--  </v-card>-->
<!--</template>-->

<!--<script>-->
<!--import { getAuth, onAuthStateChanged } from "firebase/auth";-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  name: "Home",-->
<!--  components: {},-->
<!--  data() {-->
<!--    return {-->
<!--      showMenu: false,-->
<!--      x: 0,-->
<!--      y: 0,-->
<!--      selectedTask: null,-->
<!--      selectedDoneTask: null,-->
<!--      taskValid: true,-->
<!--      taskValue: "",-->
<!--      user: {},-->
<!--      taskList: [],-->
<!--      doneTaskList: [],-->
<!--      listIcon: "mdi-checkbox-blank-circle-outline",-->
<!--      ListIconDone: "mdi-check-circle",-->
<!--      ListIconDoneDelete: "mdi-delete-circle",-->
<!--      ListIconDelete: "mdi-delete-circle-outline",-->
<!--      taskRules: [-->
<!--        (v) => !!v,-->
<!--        // (v) => v.length <= 50 || "This field must be less than 50 characters",-->
<!--      ],-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    fetchUrl() {-->
<!--      return `https://todo-5c9df-default-rtdb.europe-west1.firebasedatabase.app/${this.user.uid}`;-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    openRightClickMenu(e) {-->
<!--      console.log("right");-->
<!--      e.preventDefault();-->
<!--      this.showMenu = false;-->
<!--      this.x = e.clientX;-->
<!--      this.y = e.clientY;-->
<!--      this.$nextTick(() => {-->
<!--        this.showMenu = true;-->
<!--      });-->
<!--    },-->
<!--    async addTask() {-->
<!--      if (this.taskValid) {-->
<!--        this.postToDatabase();-->
<!--        this.resetValidation();-->
<!--        this.$refs.addTaskInput.blur();-->
<!--      }-->
<!--    },-->
<!--    resetValidation() {-->
<!--      this.$refs.form.reset();-->
<!--    },-->
<!--    getUserData() {-->
<!--      const auth = getAuth();-->
<!--      onAuthStateChanged(auth, (user) => {-->
<!--        if (user) {-->
<!--          this.user = user;-->
<!--          this.getFromDatabase();-->
<!--        } else {-->
<!--          console.log("User not logged in");-->
<!--        }-->
<!--      });-->
<!--    },-->
<!--    postToDatabase() {-->
<!--      const taskData = {-->
<!--        task: this.taskValue,-->
<!--        status: "todo",-->
<!--      };-->
<!--      axios-->
<!--        .post(this.fetchUrl + ".json", taskData)-->
<!--        .then((response) => {-->
<!--          console.log("Post response", response);-->
<!--          this.getFromDatabase();-->
<!--        })-->
<!--        .catch((error) => {-->
<!--          console.log(error);-->
<!--        });-->
<!--    },-->
<!--    updateDatabase(taskId, status) {-->
<!--      axios-->
<!--        .patch(`${this.fetchUrl}/${taskId}.json`, {-->
<!--          status: status,-->
<!--        })-->
<!--        .then((response) => {-->
<!--          console.log("update response", response);-->
<!--          this.getFromDatabase();-->
<!--        })-->
<!--        .catch((error) => {-->
<!--          console.log(error);-->
<!--        });-->
<!--    },-->
<!--    getFromDatabase() {-->
<!--      this.taskList.splice(0, this.taskList.length);-->
<!--      this.doneTaskList.splice(0, this.doneTaskList.length);-->
<!--      console.log("getFrom");-->
<!--      axios-->
<!--        .get(this.fetchUrl + ".json")-->
<!--        .then((response) => {-->
<!--          Object.entries(response.data).forEach((element) => {-->
<!--            const task = {-->
<!--              uid: element[0],-->
<!--              value: element[1].task,-->
<!--              status: element[1].status,-->
<!--            };-->
<!--            if (task.status === "todo") {-->
<!--              this.taskList.push(task);-->
<!--            } else if (task.status === "done") {-->
<!--              this.doneTaskList.push(task);-->
<!--            }-->
<!--          });-->
<!--        })-->
<!--        .catch((error) => {-->
<!--          console.log(error);-->
<!--        });-->
<!--    },-->
<!--    deleteFromDatabase(taskId) {-->
<!--      axios-->
<!--        .delete(`${this.fetchUrl}/${taskId}.json`)-->
<!--        .then(() => {-->
<!--          console.log("Succesfully deleted");-->
<!--          this.getFromDatabase();-->
<!--        })-->
<!--        .catch((error) => {-->
<!--          console.log(error);-->
<!--        });-->
<!--    },-->
<!--  },-->
<!--  created() {-->
<!--    this.getUserData();-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--.taskDone {-->
<!--  text-decoration: line-through;-->
<!--}-->
<!--.rightClickMenu {-->
<!--  cursor: pointer;-->
<!--}-->
<!--</style>-->
