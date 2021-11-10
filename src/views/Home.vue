<template>
  <div>
    <v-form ref="form" v-model="taskValid">
      <v-row>
        <v-col cols="12" md="11"
          ><v-text-field
            @keydown.enter.prevent="addTask"
            v-model="taskValue"
            label="Add task"
            :counter="50"
            :rules="taskRules"
            required
          ></v-text-field
        ></v-col>
        <v-col cols="12" md="1"
          ><v-btn
            :disabled="!taskValid"
            @click="addTask"
            elevation="2"
            fab
            color="primary"
            ><v-icon dark> mdi-plus </v-icon></v-btn
          ></v-col
        >
      </v-row>
    </v-form>

    <v-list dense>
      <v-subheader>TASKS</v-subheader>
      <v-list-item-group v-model="selectedTask" color="primary">
        <v-list-item v-for="task in taskList" :key="task.id">
          <v-list-item-icon>
            <v-icon @click="makeTaskDone(task)" v-text="listIcon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="task"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-list dense>
      <v-subheader>DONE</v-subheader>
      <v-list-item-group v-model="selectedDoneTask" color="primary">
        <v-list-item v-for="task in doneTaskList" :key="task.id">
          <v-list-item-icon>
            <v-icon
              @click="makeTaskActive(task)"
              v-text="doneListIcon"
            ></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="taskDone"
              v-text="task"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      selectedTask: null,
      selectedDoneTask: null,
      taskValid: true,
      taskValue: "",
      taskList: ["Task", "Task2"],
      doneTaskList: ["DoneTask1"],
      listIcon: "mdi-checkbox-blank-circle-outline",
      doneListIcon: "mdi-checkbox-marked-circle-outline",
      taskRules: [
        (v) => !!v || "This field is required",
        (v) => v.length <= 50 || "This field must be less than 50 characters",
      ],
    };
  },
  methods: {
    addTask() {
      if (this.taskValid) {
        this.taskList.push(this.taskValue);
        this.resetValidation();
      }
    },
    makeTaskDone(task) {
      const index = this.taskList.indexOf(task);
      this.taskList.splice(index, 1);
      this.doneTaskList.push(task);
    },
    makeTaskActive(task) {
      const index = this.doneTaskList.indexOf(task);
      this.doneTaskList.splice(index, 1);
      this.taskList.push(task);
    },
    resetValidation() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
.taskDone {
  text-decoration: line-through;
}
</style>
