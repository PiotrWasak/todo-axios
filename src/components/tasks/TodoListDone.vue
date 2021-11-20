<template>
  <v-list dense>
    <v-subheader>DONE: {{ doneTaskListCounter }}</v-subheader>
    <v-list-item-group v-model="selectedDoneTask" color="primary">
      <v-fade-transition group tag="v-list">
      <v-list-item
        @click.right.prevent="openRightClickMenu"
        v-for="task in doneTaskList"
        :key="task.uid"
      >
        <v-list-item-icon>
          <v-icon @click="updateStatus(task.uid, 'todo')"
            >mdi-check-circle</v-icon
          >
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            class="taskDone"
            v-text="task.value"
          ></v-list-item-title>
        </v-list-item-content>
        <v-spacer></v-spacer>
        <v-list-item-icon>
          <v-icon @click="deleteTask(task.uid)">mdi-delete-circle</v-icon>
        </v-list-item-icon>
      </v-list-item>
      </v-fade-transition>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { taskListMixin } from "@/mixins/taskListMixin";

export default {
  name: "TodoListDone",
  mixins: [taskListMixin],
  props: {
    doneTaskList: Array,
  },
  data() {
    return {
      selectedDoneTask: null,
    };
  },
  methods: {},
};
</script>

<style scoped></style>
