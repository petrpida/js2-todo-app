<template>
  <h1>{{ title }}</h1>

  <t-loading v-if="loading" />

  <form v-else @submit="onSubmit">
    <t-control
      v-for="item in controlKeys"
      :key="item"
      :control="item"
      :type="controls[item].type"
      :label="controls[item].label"
      :typeInput="controls[item].typeInput"
      :value="project[item]"
      @has-input="onHasInput"
    />
    <!-- <input
          type="text"
          @input="onInput"
          :value="project.project"
        > -->
    <!-- <input
          autocomplete="off"
          id="project"
          type="text"
          v-model="project.project"
        > -->
    <t-button label="submit" />
  </form>
</template>

<script>
import db from "../utils/db.js";
import TButton from "../components/TButton.vue";
import TLoading from "../components/TLoading.vue";
import TControl from "../components/TControl.vue";

export default {
  name: "ProjectFormPage",
  data() {
    return {
      project: {
        project: "",
        description: "",
        start: "",
        ends: "",
      },
      controls: {
        project: {
          type: "text",
          label: "project name",
        },
        description: {
          type: "textarea",
          label: "description",
        },
        start: {
          type: "date",
          label: "start date",
        },
        ends: {
          type: "date",
          label: "finish date",
        },
      },
      loading: true,
    };
  },
  created() {
    if (this.$route.params.id) {
      db.get("projects/" + this.$route.params.id).then((record) => {
        this.project = record;
        this.loading = false;
      });
    }
    this.loading = false;
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
    onSubmit(e) {
      e.preventDefault();
      if (!this.$route.params.id) {
        return db.post("projects", this.project).then(() => {
          this.$router.push("/projects");
        });
      }
      return db.put("projects", this.project).then(() => {
        this.$router.push("/projects/" + this.$route.params.id);
      });
    },
    onHasInput(payload) {
      this.project[payload.control] = payload.value;
    },
  },
  components: { TButton, TLoading, TControl },
};
</script>