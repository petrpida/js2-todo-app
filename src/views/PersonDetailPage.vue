<template>
  <h1>Person Detail</h1>
  <t-loading v-if="loading" />

  <template v-else>
    <modal-delete
      :showModal="showModal"
      question="Do you really want to delete"
      :title="person.last + ' ' + person.first"
      @delete-clicked="onDeletePersonClicked"
      @cancel-clicked="showModal = false"
    />

    <t-button
      label="edit"
      @clicked="onEditClicked"
      :class="{ 'mr-1': !tasks.length }"
    />
    <t-button
      v-if="!tasks.length"
      label="delete person"
      @clicked="showModal = true"
    />

    <ul class="detail-list">
      <li>
        <div>first name:</div>
        <div class="text-bold text-rihgt">{{ person.first }}</div>
      </li>
      <li>
        <div>last name:</div>
        <div class="text-bold text-rihgt">{{ person.last }}</div>
      </li>
      <li>
        <div>position:</div>
        <div class="text-bold text-rihgt">{{ person.position || "-" }}</div>
      </li>
      <li>
        <div>skills:</div>
        <div class="text-bold text-rihgt">{{ person.skills || "-" }}</div>
      </li>
      <li>
        <div>email:</div>
        <div class="text-bold text-rihgt">{{ person.email }}</div>
      </li>
      <li>
        <div>phone:</div>
        <div class="text-bold text-rihgt">{{ person.phone || "-" }}</div>
      </li>
    </ul>

    <task-list v-if="tasks.length" :tasks="tasksToDisplay" />
    <h4 v-else>{{ `${person.last} ${person.first} has no tasks yet` }}</h4>
  </template>
</template>

<script>
import db from "../utils/db.js";
import TLoading from "../components/TLoading.vue";
import TButton from "../components/TButton.vue";
import TaskList from "../components/TaskList.vue";
import ModalDelete from "../components/ModalDelete.vue";

export default {
  name: "PersonDetailPage",
  data() {
    return {
      person: {},
      loading: true,
      tasks: [],
      showModal: false,
    };
  },
  created() {
    const prom1 = db.get("persons/" + this.$route.params.id).then((record) => {
      this.person = record;
    });
    const prom2 = db
      .get("personstasks?personid=" + this.$route.params.id)
      .then((data) => {
        this.tasks = data;
      });

    Promise.all([prom1, prom2]).then(() => {
      this.loading = false;
    });
  },
  computed: {
    tasksToDisplay() {
      return this.tasks.map((item) => {
        return {
          id: item.taskid,
          task: item.task,
          taskdate: item.taskdate,
          status: item.status,
          priority: item.priority,
          description: item.description,
        };
      });
    },
  },
  methods: {
    onEditClicked() {
      this.$router.push("/personform/" + this.$route.params.id);
    },
    onDeletePersonClicked() {
      db.delete("/persons", { id: this.$route.params.id }).then(() => {
        this.$router.push("/persons");
      });
    },
  },
  components: { TLoading, TButton, TaskList, ModalDelete },
};
</script>
