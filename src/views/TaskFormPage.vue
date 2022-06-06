<template>
  <h1>{{ title }}</h1>
  <t-loading v-if="loading" />

  <template v-else>
    <ul class="detail-list">
      <li>
        <div>project name:</div>
        <div class="text-bold">{{ project.project }}</div>
      </li>
      <li>
        <div>description:</div>
        <div class="text-bold">{{ project.description }}</div>
      </li>
      <li>
        <div>start date:</div>
        <div class="text-bold">{{ startToDisplay}}</div>
      </li>
      <li>
        <div>finish date:</div>
        <div class="text-bold">{{ endToDisplay }}</div>
      </li>
    </ul>
    <form>
    <t-control 
        v-for="item in controlsArray"
        :key="item"
        :control="item"
        :type="controls[item].type"
        :label="controls[item].label"
        :value="task[item]"
        :options="controls[item].options"
        @has-input="onHasInput"
    />
    </form>
  </template>
</template>

<script>
import TLoading from "../components/TLoading.vue";
import TControl from "../components/TControl.vue";
import db from "../utils/db.js";
import { formatDate } from "@/utils/dateUtils";

export default {
  name: "TaskFormPage",
  props: "",
  data() {
    return {
      loading: true,
      project: {},
      task: {
          task: '',
          description: '',
          status: '',
          priority: '',
          taskdate: '',
          projectid: this.$route.params.projectid
      },
      controls: {
          task: {
              type: 'text',
              label: 'task name'
          },
          description: {
              type: 'textarea',
              label: 'description'
          },
          taskdate: {
              type: 'date',
              label: 'deadline'
          },
          status: {
              label: 'status',
              type: 'select',
              options: ['', 'started', 'done']
          },
          priority: {
              label: 'priority',
              type: 'select',
              options: ['', 'low', 'standard', 'high']
          }
      }
    };
  },
  computed: {
    title() {
      if (this.$route.params.taskid) return "edit task";
      return "add task";
    },
    controlsArray () {
        return Object.keys(this.controls)
    },
    startToDisplay () {
        return formatDate (this.project.start)
    },
    endToDisplay () {
        return formatDate (this.project.ends)
    }
  },
  created () {
      if (this.$route.params.projectid) {
          db.get('/projects/' + this.$route.params.projectid).then(record => {
              this.project = record
              this.loading = false
          })
      } else {
          db.get('/tasks/' + this.$route.params.taskid).then(record => {
              this.task = record
              console.log(this.task.projectid)
          }).then(() => {db.get('/projects/' + this.task.projectid).then(projectRecord => {
              this.project = projectRecord
              console.log(this.project)

              this.loading = false
          })})
      }
    },
  methods: {
      onHasInput (payload) {
          this.task[payload.control] = payload.value
      }
  },
  components: { TLoading, TControl },
};
</script>

<style></style>
