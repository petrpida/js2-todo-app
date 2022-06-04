<template>
  <li @click="showDiv = !showDiv">
    <div
      class="task-item-flex"
      :class="{
        'task-done': status === 'done',
        'task-started': status === 'started',
      }"
    >
      <div class="text-bold">{{ task }}</div>
      <div class="w-30">
        <div class="text-small task-item-flex">
          <div>deadline:</div>
          <div>{{ dateToDisplay }}</div>
        </div>
        <div class="pt-1 text-small task-item-flex">
          <div>priorty:</div>
          <div>{{ priority }}</div>
        </div>
      </div>
    </div>
    <transition name="slide-down">
      <div v-if="showDiv" class="task-item-flex pt-1" :class="{
        'task-done': status === 'done',
        'task-started': status === 'started',
      }">
        <div class="text-small">{{ description }}</div>
        <div class="text-small task-item-flex w-30">
          <div>status:</div>
          <div>{{ status }}</div>
        </div>
      </div>
    </transition>
  </li>
</template>

<script>
import { formatDate } from "../utils/dateUtils.js";

export default {
  name: "TaskListItem",
  props: {
    task: String,
    taskdate: String,
    status: String,
    priority: String,
    description: {
      validator: (v) => typeof v === "string" || v === null,
    },
  },
  data() {
    return {
      showDiv: false,
    };
  },
  computed: {
    dateToDisplay() {
      return formatDate(this.taskdate);
    },
  },
};
</script>

<style lang="stylus" scoped>

@import '../styles/variables.styl'

.task-item-flex
    display: flex
    justify-content: space-between
    align-items: center

.w-30
    width: 30%

li:hover
    background-color: $secondary
    cursor: pointer

.task-done
  background: $task-done-color

.task-started
  background: $primary

li > div
    padding: 15px
</style>
