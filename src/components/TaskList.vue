<template>
  <ul class="task-list mb-2">
    <task-list-item 
    v-for="item in tasks"
    :key="item.id"
    :taskid="item.id"
    :task="item.task"
    :taskdate="item.taskdate"
    :status="item.status"
    :priority="item.priority" 
    :description="item.description"
    />
  </ul>
</template>

<script>

import TaskListItem from './TaskListItem.vue'

export default {
  name: "TaskList",
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
  },
  components: { TaskListItem }
};
</script>

<style lang="stylus" scoped>

@import '../styles/variables.styl'

.task-list
  list-style-type: none
  margin: 0 auto
  padding: 0
  width: 80%
  max-width: 550px


</style>
