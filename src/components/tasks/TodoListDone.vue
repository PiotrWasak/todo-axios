<template>
  <v-list dense>
    <v-subheader>DONE</v-subheader>
    <v-list-item-group v-model="selectedDoneTask" color="primary">
      <v-list-item
        @click.right.prevent="openRightClickMenu"
        v-for="task in doneTaskList"
        :key="task.uid"
      >
        <v-list-item-icon>
          <v-icon @click="updateDatabase(task.uid, 'todo')"
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
          <v-icon @click="deleteFromDatabase(task.uid)"
            >mdi-delete-circle</v-icon
          >
        </v-list-item-icon>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "TodoListDone",
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
