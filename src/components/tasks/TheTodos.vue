<template>
  <v-container>
    <todo-add v-on:add-task="postToDatabase"></todo-add>
    <todo-list
      v-on:deleteTask="deleteFromDatabase"
      v-on:updateStatus="updateDatabase"
      :task-list="taskList"
    ></todo-list>
    <todo-list-done
      v-on:updateStatus="updateDatabase"
      :done-task-list="doneTaskList"
    ></todo-list-done>
  </v-container>
</template>

<script>
import TodoAdd from "@/components/tasks/TodoAdd";
import TodoList from "@/components/tasks/TodoList";
import TodoListDone from "@/components/tasks/TodoListDone";
import { userDataMixin } from "@/mixins/userDataMixin";
import {
  getUserData,
  postToDatabase,
  updateDatabase,
  getFromDatabase,
  deleteFromDatabase,
} from "@/utils/databaseFunctions";

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
    getUserData,
    postToDatabase,
    updateDatabase,
    getFromDatabase,
    deleteFromDatabase,
  },
};
</script>

<style scoped></style>
