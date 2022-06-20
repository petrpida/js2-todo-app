<template>
  <h1>{{ title }}</h1>

  <t-loading v-if="loading" />

  <t-form v-else :controls="controls" @submitted="onSubmitted"/>

</template>

<script>
import db from "../utils/db.js";
import TLoading from "../components/TLoading.vue";
import TForm from "../components/TForm.vue";

export default {
  name: "PersonFormPage",
  data() {
    return {
      controls: {
        first: {
          type: "text",
          label: "first name",
          initialValue: '',
          validationRules: [
            {rule: 'required', message: 'please enter your first name'},
            {rule: 'minLength', par: 2, message: 'minimum length is 2 characters'},
            {rule: 'maxLength', par: 30, message: 'maximum length is 30 characters'}
          ]
        },
        last: {
          type: "text",
          label: "last name",
          initialValue: '',
          validationRules: [
            {rule: 'required', message: 'please enter your last name'},
            {rule: 'minLength', par: 2, message: 'minimum length is 2 characters'},
            {rule: 'maxLength', par: 50, message: 'maximum length is 50 characters'}
          ]
        },
        email: {
          type: "email",
          label: "email",
          initialValue: '',
          validationRules: [
            {rule: 'required', message: 'please enter your first name'},
            ]
        },
        phone: {
          type: "tel",
          label: "phone",
          initialValue: '',
          validationRules: []
        },
        position: {
          type: "text",
          label: "position",
          initialValue: '',
          validationRules: []
        },
        skills: {
          type: "text",
          label: "skills",
          initialValue: '',
          validationRules: []
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
      db.get("/persons/" + this.$route.params.id).then((record) => {
        this.controlsKeys.forEach(item => {
          this.controls[item].initialValue = record[item]
        })
        this.loading = false;
      });
  },
  computed: {
    title() {
      return this.$route.params.id ? "edit person" : "add person";
    },
    controlsKeys () {
      return Object.keys(this.controls)
    },
    
  },
  methods: {
    onSubmitted() {
      console.log('submit clicked')
      // pri ukladani dat, pokud server neodpovida, nebo je spatny net, tak nepoznam, ze jestli se neco deje

      // if (!this.$route.params.id) {
      //   db.post("/persons", this.person).then(() => {
      //     this.$router.push("/persons");
      //   });
      // }
      // db.put("/persons", this.person).then(() => {
      //   this.$router.push("/persons/" + this.$route.params.id);
      // });
    },
  },
  emits: ['onSubmitted'],
  components: { TLoading, TForm },
};
</script>