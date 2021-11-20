<template>
  <v-list dense>
    <v-subheader>TASKS: {{ taskListCounter }}</v-subheader>
    <v-list-item-group v-model="selectedTask" color="primary">
      <v-fade-transition group tag="v-list">
        <v-list-item
          @click.right.prevent="openRightClickMenu"
          v-for="task in taskList"
          :key="task.uid"
        >
          <v-list-item-icon>
            <v-icon @click="updateStatus(task.uid, 'done')"
              >mdi-checkbox-blank-circle-outline</v-icon
            >
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="task.value"></v-list-item-title>
          </v-list-item-content>
          <v-spacer></v-spacer>
          <v-list-item-icon>
            <v-icon @click="deleteTask(task.uid)"
              >mdi-delete-circle-outline</v-icon
            >
          </v-list-item-icon>
        </v-list-item>
      </v-fade-transition>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { taskListMixin } from "@/mixins/taskListMixin";

export default {
  name: "TodoList",
  props: { taskList: Array },
  mixins: [taskListMixin],
  data() {
    return {};
  },
};
</script>

<style scoped></style>
