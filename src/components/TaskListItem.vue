<template>
  <li class="list" @click="onClick">
    <div
      class="task-item-flex"
      :class="{
        'task-done': status === 'done',
        'task-started': status === 'started',
      }"
    >
      <div class="task text-bold text-left">{{ task }}</div>
      <div class="priority text-bold">{{ priorityLevel }}</div>
      <div class="status text-small">{{ status }}</div>
      <div class="deadline text-right" :class="{'text-red text-bold': isLate}">{{ dateToDisplay }}</div>
    </div>
  </li>
</template>

<script>
import { formatDate } from "../utils/dateUtils.js";

export default {
  name: "TaskListItem",
  props: {
    taskid: Number,
    task: String,
    taskdate: String,
    status: String,
    priority: String,
    description: {
      validator: (v) => typeof v === "string" || v === null,
    },
  },
  computed: {
    dateToDisplay() {
      return formatDate(this.taskdate);
    },
    isLate () {
      if (this.status === 'done') return false
      const today = new Date ()
      const deadline = new Date (this.taskdate)
      return deadline.getTime() < today.getTime()
    },
    priorityLevel () {
      if (this.status === 'done') return ''
      if (this.priority === 'high') return '!!!'
      return this.priority === 'standard' ? '!' : '' 
    }
  },
  methods: {
    onClick () {
      this.$router.push('/taskdetail/' + this.taskid )
    }
  }
};
</script>

<style lang="stylus" scoped>

@import '../styles/variables.styl'

.task-item-flex
    display: flex
    justify-content: space-between
    align-items: center

.list
  border-bottom: 1px solid white

li:hover
  cursor: pointer

.task-done
  background: $task-done-color
  &:hover
    background: darken($task-done-color, 10)

.task-started
  background: $task-started-color
  &:hover
    background: darken($task-started-color, 10)

.list > div
  padding: 15px 5px

.priority 
  width: 10%

.task
  width: 40%
  padding-left: 10px

.status
  width: 25%

.deadline
  width: 25%

</style>
