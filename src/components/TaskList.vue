<template>
  <ul class="task-list mb-2">
    <task-list-item 
    v-for="item in tasksSorted"
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
  computed: {
    tasksSorted () {
      return this.tasks.slice().sort((a, b) => {
        let aSortingString = a.status === 'started' ? 'A' : 'B'
        let bSortingString = b.status === 'started' ? 'A' : 'B'
        if (a.priority === 'high') {
          aSortingString += 'A'
        } else {
          aSortingString += a.priority === 'standard' ? 'B' : 'C'
          }
        if (b.priority === 'high') {
          bSortingString += 'A'
        } else {
          bSortingString += b.priority === 'standard' ? 'B' : 'C'
        }
        aSortingString += a.taskdate
        bSortingString += b.taskdate

        return aSortingString.localeCompare(bSortingString)
      })
    }
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
