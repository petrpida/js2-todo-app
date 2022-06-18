<template>

  <h1>Person Detail</h1>
  <t-loading v-if="loading"/>

  <template v-else>
    <t-button label="edit" @clicked="onEditClicked" :class="{'mr-1' : !tasks.length}"/>
    <t-button v-if="!tasks.length" label="delete person" @clicked="onDeletePersonClicked"/>
    
    <ul class="detail-list">
    <li>
      <div>first name: </div>
      <div class="text-bold">{{ person.first }}</div>
    </li>
    <li>
      <div>last name: </div>
      <div class="text-bold">{{ person.last }}</div>
    </li>
    <li>
      <div>position: </div>
      <div class="text-bold">{{ person.position || '-' }}</div>
    </li>
    <li>
      <div>skills: </div>
      <div class="text-bold">{{ person.skills || '-' }}</div>
    </li>
    <li>
      <div>email: </div>
      <div class="text-bold">{{ person.email }}</div>
    </li>
    <li>
      <div>phone: </div>
      <div class="text-bold">{{ person.phone || '-' }}</div>
    </li>
  </ul>

  <task-list v-if="tasks.length" :tasks="tasksToDisplay" />
  </template>
  
</template>

<script>

import db from '../utils/db.js'
import TLoading from '../components/TLoading.vue'
import TButton from '../components/TButton.vue'
import TaskList from '../components/TaskList.vue'

export default {
  name: 'PersonDetailPage',
  data () {
    return {
      person: {},
      loading: true,
      tasks: []
    }
  },
  created () {
    const prom1 = db.get('persons/' + this.$route.params.id).then(record => {
      this.person = record
    })
    const prom2 = db.get('personstasks?personid=' + this.$route.params.id).then(data => {
      this.tasks = data
    })

    Promise.all([prom1, prom2]).then(() => {
      this.loading = false
    })
  },
  computed: {
    tasksToDisplay () {
      return this.tasks.map(item => {
        return {
          id: item.taskid,
          task: item.task,
          taskdate: item.taskdate,
          status: item.status,
          priority: item.priority,
          description: item.description
        }
      })
      .sort((a, b) => {
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
  methods: {
    onEditClicked () {
      this.$router.push('/personform/' + this.$route.params.id)
    },
    onDeletePersonClicked () {
      console.log('person deleted')
    }
  },
  components: { TLoading, TButton, TaskList }
}
</script>