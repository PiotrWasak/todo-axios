<template>
  <v-form ref="form" v-model="taskValid">
    <v-row>
      <v-col cols="12" md="11">
        <v-text-field
          ref="addTaskInput"
          @keydown.enter.prevent="addTask"
          v-model="taskValue"
          label="Add task"
          :counter="50"
          :rules="taskRules"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="1">
        <v-fade-transition>
          <v-btn
            v-if="taskValid"
            @click.prevent="addTask"
            elevation="2"
            fab
            color="primary"
          >
            <v-icon dark> mdi-plus</v-icon>
          </v-btn>
        </v-fade-transition>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: "TodoAdd",
  data() {
    return {
      taskValid: true,
      taskValue: "",
      taskRules: [
        (v) => !!v,
        // (v) => v.length <= 50 || "This field must be less than 50 characters",
      ],
    };
  },
  methods: {
    async addTask() {
      if (this.taskValid) {
        this.$emit("add-task", this.taskValue);
        this.resetValidation();
        this.$refs.addTaskInput.blur();
      }
    },
    resetValidation() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped></style>
