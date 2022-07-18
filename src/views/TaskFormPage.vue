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
        <div class="text-bold">{{ startToDisplay }}</div>
      </li>
      <li>
        <div>finish date:</div>
        <div class="text-bold">{{ endToDisplay }}</div>
      </li>
    </ul>
    <t-form :controls="controls" @submitted="onSubmitted"/>
  </template>
</template>

<script>
import TLoading from "../components/TLoading.vue";
import TForm from '../components/TForm.vue'
import db from "../utils/db.js";
import { formatDate } from "@/utils/dateUtils";

export default {
  name: "TaskFormPage",
  props: "",
  data() {
    return {
      loading: true,
      project: {},
      projectid: '',
      controls: {
        task: {
          type: "text",
          label: "task name",
          initialValue: "",
          validationRules: [
            {rule: 'required', message: 'please enter the task name'},
            {rule: 'minLength', par: 2, message: 'minimum length is 2 characters'},
            {rule: 'maxLength', par: 50, message: 'maximum length is 50 characters'}
          ]
        },
        description: {
          type: "textarea",
          label: "description",
          initialValue: '',
          validationRules: []
        },
        taskdate: {
          type: "date",
          label: "deadline",
          initialValue: '',
          validationRules: [
            {rule: 'required', message: 'please enter the task name'},
            {rule: 'finishInPast', message: 'the finish date must be in the future'}
            //compare finish date of project and task => task cant be finishing later than project
          ]
        },
        status: {
          label: "status",
          type: "select",
          options: ["", "started", "done"],
          initialValue: '',
          validationRules: [
            {rule: 'required', message: 'please select status of this task'},
          ]
        },
        priority: {
          label: "priority",
          type: "select",
          options: ["", "low", "standard", "high"],
          initialValue: '',
          validationRules: [
            {rule: 'required', message: 'please select priority of this task'},
          ]
        },
      },
    };
  },
  computed: {
    title() {
      if (this.$route.params.taskid) return "edit task";
      return "add task";
    },
    controlsKeys() {
      return Object.keys(this.controls);
    },
    startToDisplay() {
      return formatDate(this.project.start);
    },
    endToDisplay() {
      return formatDate(this.project.ends);
    },
  },
  created() {
    if (this.$route.params.projectid) {
      db.get("/projects/" + this.$route.params.projectid).then((record) => {
        this.project = record;
        this.loading = false;
      });
    } else {
      db.get("/tasks/" + this.$route.params.taskid)
        .then((record) => {
          this.controlsKeys.forEach(control => {
            this.controls[control].initialValue = record[control]
          });
          this.projectid = record.projectid
        })
        .then(() => {
          db.get("/projects/" + this.projectid).then((projectRecord) => {
            this.project = projectRecord;
            this.loading = false;
          });
        });
    }
  },
  methods: {
    onSubmitted(data) {
      if (this.$route.params.projectid) {
        db.post("/tasks", Object.assign(data, {projectid: this.$route.params.projectid})).then(() => {
          this.$router.push("/projects/" + this.$route.params.projectid);
        });
      } else {
        db.put("/tasks/" + this.$route.params.taskid, Object.assign(data, {id: this.$route.params.taskid})).then(() => {
          this.$router.push("/projects/" + this.projectid);
        });
      }
    },
  },
  components: { TLoading, TForm },
};
</script>