<template>

  <h1>Projects</h1>
  <t-loading v-if="loading" />

  <template v-else>
    <div class="mb-2">
      <t-button @clicked="onClicked" label="add new" />
    </div>
    <t-list
      title="project"
      title-right="start/end"
      route-to="projects"
      :items="projectsToDisplay"
    />
  </template>

</template>

<script>
import db from '../utils/db.js'
import TList from '../components/TList.vue'
import { formatDate } from '../utils/dateUtils.js'
import TLoading from '../components/TLoading.vue'
import TButton from '../components/TButton.vue'

export default {
  name: 'ProjectsPage',
  data () {
    return {
      projects: [],
      loading: true
    }
  },
  computed: {
    projectsToDisplay () {
      return this.projects
      .slice()
      .sort ((a, b) => {
        return a.ends.localeCompare(b.ends)
      })
      .map(project => {
        return {
          id: project.id,
          title: project.project,
          description: project.description || '',
          rightTop: formatDate(project.start),
          rightBottom: formatDate(project.ends),
        }
      })
    }
  },
  created() {
    db.get('projects').then(data => {
      this.projects = data
      this.loading = false
    })
  },
  methods: {
    onClicked () {
      this.$router.push('/projectform')
    }
  },
  components: { TList, TLoading, TButton }
}

</script>