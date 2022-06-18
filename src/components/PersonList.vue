<template>
  <h3>{{ header }}</h3>
  <ul class="detail-list">
    <li v-for="person in personsSorted" :key="person.id" class="person-list">
      <div>{{ `${person.last} ${person.first}` }}</div>
      <div class="delete" @click="onDeleteClicked(person.id)">remove person</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "PersonList",
  props: {
    persons: {
      type: Array,
      required: true,
    },
    header: String,
  },
  computed: {
    personsSorted() {
      return this.persons.slice().sort((a, b) => {
        let aFull = a.last + a.first;
        let bFull = b.last + b.first;
        return aFull.localeCompare(bFull);
      });
    },
  },
  emits: ["delete-person-task"],
  methods: {
    onDeleteClicked(par) {
      this.$emit("delete-person-task", par);
    },
  },
};
</script>

<style lang="stylus" scoped>
.delete
    cursor: pointer
    text-decoration: underline
    transition: transform .1s ease
    &:hover
        transform: scale(1.1)
</style>
