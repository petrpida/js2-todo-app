<template>
  <h1>{{ title }}</h1>
  <t-loading v-if="loading" />
  <t-form v-else :controls="controls" @submitted="onSubmitted"/>
</template>

<script>
import db from "../utils/db.js";
import TLoading from "../components/TLoading.vue";
import TForm from '../components/TForm.vue'

export default {
  name: "ProjectFormPage",
  data() {
    return {
      controls: {
        project: {
          type: "text",
          label: "project name",
          initialValue: "",
          validationRules: [
            {rule: 'required', message: 'please enter the project name'},
            {rule: 'minLength', par: 2, message: 'minimum length is 2 characters'},
            {rule: 'maxLength', par: 50, message: 'maximum length is 50 characters'}
          ]
        },
        description: {
          type: "textarea",
          label: "description",
          initialValue: "",
          validationRules: []
        },
        start: {
          type: "date",
          label: "start date",
          initialValue: "",
          validationRules: [
            {rule: 'required', message: 'please enter the start date of this project'},
          ]
        },
        ends: {
          type: "date",
          label: "finish date",
          initialValue: "",
          validationRules: [
            {rule: 'required', message: 'please enter the finish date of this project'},
            {rule: 'finishInPast', message: 'the finish date must be in the future'}
          ]
        },
      },
      loading: true,
    };
  },
  created() {
    if (!this.$route.params.id) {
      this.loading = false
      return
    }
      db.get("projects/" + this.$route.params.id).then((record) => {
        this.controlKeys.forEach(control => {
          this.controls[control].initialValue = record[control]
        })
        this.loading = false;
      });
    
  },
  computed: {
    title() {
      return this.$route.params.id ? "edit project" : "add project";
    },
    controlKeys() {
      return Object.keys(this.controls);
    },
  },
  methods: {
    onSubmitted(data) {
      if (!this.$route.params.id) {
        return db.post("projects", data).then(() => {
          this.$router.push("/projects");
        });
      }
      return db.put("projects", Object.assign(data, {id: this.$route.params.id})).then(() => {
        this.$router.push("/projects/" + this.$route.params.id);
      });
    },
  },
  components: { TLoading, TForm },
};
</script>