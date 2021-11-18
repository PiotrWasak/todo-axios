export var taskListMixin = {
  data() {
    return {
      selectedTask: null,
    };
  },
  methods: {
    updateStatus(taskUID, newStatus) {
      this.$emit("updateStatus", taskUID, newStatus);
    },
    deleteTask(taskUID) {
      this.$emit("deleteTask", taskUID);
    },
  },
  computed: {
    taskListCounter() {
      return this.taskList.length;
    },
    doneTaskListCounter() {
      return this.doneTaskList.length;
    },
  },
};
