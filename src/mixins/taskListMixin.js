export var taskListMixin = {
  data() {
    return {
      selectedTask: null,
    };
  },
  methods: {
    updateStatus(taskUID, newStatus) {
      console.log("update status");
      this.$emit("updateStatus", taskUID, newStatus);
    },
  },
};
