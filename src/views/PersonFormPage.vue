<template>
  <h1>{{ title }}</h1>

  <t-loading v-if="loading"/>

  <form v-else @submit="onSubmit">
    <div class="form-control">
      <label for="first">first name</label>
      <input v-model="person.first" id="first" type="text" autocomplete="off" />
    </div>
    <div class="form-control">
      <label for="last">last name</label>
      <input v-model="person.last" id="last" type="text" autocomplete="off" />
    </div>
    <div class="form-control">
      <label for="position">position</label>
      <input
        v-model="person.position"
        id="position"
        type="text"
        autocomplete="off"
      />
    </div>
    <div class="form-control">
      <label for="skills">skills</label>
      <input
        v-model="person.skills"
        id="skills"
        type="text"
        autocomplete="off"
      />
    </div>
    <div class="form-control">
      <label for="email">email</label>
      <input
        v-model="person.email"
        id="email"
        type="email"
        autocomplete="off"
      />
    </div>
    <div class="form-control">
      <label for="phone">phone</label>
      <input 
        v-model="person.phone" 
        id="phone" 
        type="tel" 
        autocomplete="off" 
      />  
    </div>
    <t-button label="submit" />
  </form>
</template>

<script>
import db from "../utils/db.js";
import TButton from "../components/TButton.vue";
import TLoading from "../components/TLoading.vue";

export default {
  name: "PersonFormPage",
  data() {
    return {
      person: {
        first: "",
        last: "",
        position: "",
        skills: "",
        email: "",
        phone: "",
      },
      loading: true
    };
  },
  created() {
    if (this.$route.params.id) {
      db.get("/persons/" + this.$route.params.id).then((record) => {
        this.person = record;
        this.loading = false
      });
    }
    this.loading = false
  },
  computed: {
    title() {
      return this.$route.params.id ? "edit person" : "add person";
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      // pri ukladani dat, pokud server neodpovida, nebo je spatny net, tak nepoznam, ze jestli se neco deje

      if (!this.$route.params.id) {
        db.post("/persons", this.person).then(() => {
          this.$router.push("/persons");
        });
      }
      db.put("/persons", this.person).then(() => {
        this.$router.push("/persons/" + this.$route.params.id);
      });
    },
  },
  components: { TButton, TLoading },
};
</script>

<style lang="stylus" scoped>

// nebylo by vic DRY cely form udelat jako component? 
form
  width: 80%
  max-width: 500px
  margin: 0 auto

.form-control
  display: flex
  flex-direction: column
  text-align: left
  margin-bottom: 2rem

.form-control input
  font-size: 1.2rem
  padding: .35em .75em
</style>
