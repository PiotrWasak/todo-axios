<template>
  <v-card>
    <TheTodos></TheTodos>
  </v-card>
</template>

<script>
import TheTodos from "@/components/tasks/TheTodos";
export default {
  name: "Todos",
  components: { TheTodos },
};
</script>

<style scoped></style>
