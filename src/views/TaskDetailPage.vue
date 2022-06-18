<template>
  <h1>Task Detail</h1>
  <t-loading v-if="loading" />

  <template v-else>
    <t-button label="edit" @clicked="onEditClicked" class="mr-1"/>
    <t-button v-if="task.status === 'started'" label="mark as done" @clicked="onChangeStatus('done')" />
    <t-button v-else-if="task.status === 'done'" label="mark as started" @clicked="onChangeStatus('started')" />

    <ul class="detail-list">
      <li>
        <div>task name:</div>
        <div class="text-bold pl-3 text-right">{{ task.task }}</div>
      </li>
      <li>
        <div>project name:</div>
        <div class="pl-3 text-right">{{ task.project }}</div>
      </li>
      <li>
        <div>description:</div>
        <div class="pl-3 text-right">{{ task.description }}</div>
      </li>
      <li>
        <div>status:</div>
        <div>{{ task.status }}</div>
      </li>
      <li>
        <div>priority:</div>
        <div>{{ task.priority }}</div>
      </li>
      <li>
        <div>deadline:</div>
        <div>{{ dateToDisplay }}</div>
      </li>
    </ul>
  </template>
</template>

<script>
import TLoading from '../components/TLoading.vue'
import TButton from '../components/TButton.vue'
import db from '../utils/db.js'
import { formatDate } from '@/utils/dateUtils.js'


export default {
  name: 'TaskDetailPAge',
  props: '',
  data () {
    return {
        loading: true,
        isDone: false,
        task: {}
    }
  },
  computed: {
      dateToDisplay () {
          return formatDate(this.task.taskdate)
      }
  },
  created () {
    db.get('/tasks/' + this.$route.params.taskid).then(record => {
        this.task = record
        this.loading = false
    })
  },
  methods: {
      onEditClicked () {
          this.$router.push('/taskformedit/' + this.$route.params.taskid)
      },
      onChangeStatus (par) {
          db.put('/tasks/' + this.$route.params.taskid, {
              id: this.$route.params.taskid,
              status: par
          }).then(() => {
              this.$router.push('/projects/' + this.task.projectid)
          })
      }
  },
  components: { TLoading, TButton }
}
</script>