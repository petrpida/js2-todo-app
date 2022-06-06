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
      :value="person[item]"
      @has-input="onHasInput"
    />

    <!-- <div class="form-control">
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
      <input v-model="person.phone" id="phone" type="tel" autocomplete="off" />
    </div> -->
    <t-button label="submit" />
  </form>
</template>

<script>
import db from "../utils/db.js";
import TButton from "../components/TButton.vue";
import TLoading from "../components/TLoading.vue";
import TControl from "../components/TControl.vue";

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
      controls: {
        first: {
          type: "text",
          label: "first name",
        },
        last: {
          type: "text",
          label: "last name",
        },
        email: {
          type: "email",
          label: "email",
        },
        phone: {
          type: "tel",
          label: "phone",
        },
        position: {
          type: "text",
          label: "position",
        },
        skills: {
          type: "text",
          label: "skills",
        },
      },
      loading: true,
    };
  },
  created() {
    if (this.$route.params.id) {
      db.get("/persons/" + this.$route.params.id).then((record) => {
        this.person = record;
        this.loading = false;
      });
    }
    this.loading = false;
  },
  computed: {
    title() {
      return this.$route.params.id ? "edit person" : "add person";
    },
    controlKeys () {
      return Object.keys(this.controls)
    }
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
    onHasInput(payload) {
      this.person[payload.control] = payload.value;
    },
  },
  components: { TButton, TLoading, TControl },
};
</script>