<template>
  <v-container>
    <todo-add
      v-on:add-task="postToDatabase"
    ></todo-add>
    <todo-list v-on:deleteTask="deleteFromDatabase" v-on:updateStatus="updateDatabase" :task-list="taskList"></todo-list>
    <todo-list-done  v-on:updateStatus="updateDatabase" :done-task-list="doneTaskList"></todo-list-done>
  </v-container>
</template>

<script>
import TodoAdd from "@/components/tasks/TodoAdd";
import TodoList from "@/components/tasks/TodoList";
import TodoListDone from "@/components/tasks/TodoListDone";
import axios from "axios";
import { userDataMixin } from "@/mixins/userDataMixin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "TheTodoList",
  components: { TodoListDone, TodoList, TodoAdd },
  mixins: [userDataMixin],
  data() {
    return {
      taskList: [],
      doneTaskList: [],
    };
  },
  computed: {
    fetchUrl() {
      return `https://todo-5c9df-default-rtdb.europe-west1.firebasedatabase.app/${this.userData.uid}`;
    },
  },
  methods: {
    getUserData() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userData = user;
          this.getFromDatabase();
        } else {
          console.log("User not logged in");
        }
      });
    },
    postToDatabase(taskValue) {
      const taskData = {
        task: taskValue,
        status: "todo",
      };
      axios
        .post(`/${this.userData.uid}.json`, taskData)
        .then(() => {
          this.getFromDatabase();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateDatabase(taskId, status) {
      axios
        .patch(`${this.userData.uid}/${taskId}.json`, {
          status: status,
        })
        .then(() => {
          this.getFromDatabase();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFromDatabase() {
      this.taskList.splice(0, this.taskList.length);
      this.doneTaskList.splice(0, this.doneTaskList.length);
      axios
        .get(`${this.userData.uid}.json`)
        .then((response) => {
          Object.entries(response.data).forEach((element) => {
            const task = {
              uid: element[0],
              value: element[1].task,
              status: element[1].status,
            };
            if (task.status === "todo") {
              this.taskList.push(task);
            } else if (task.status === "done") {
              this.doneTaskList.push(task);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteFromDatabase(taskId) {
      axios
        .delete(`${this.userData.uid}/${taskId}.json`)
        .then(() => {
          console.log("Succesfully deleted");
          this.getFromDatabase();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    //this.getUserData();
  },
};
</script>

<style scoped></style>
