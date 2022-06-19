<template>
  <h1>Task Detail</h1>
  <t-loading v-if="loading" />

  <template v-else>
    <t-modal :show="showAddPersonModal" @close-modal="showAddPersonModal = false">
      <p>
        select person for task: <span class="text-bold">{{ task.task }}</span>
      </p>
      <ul class="detail-list">
        <li
          v-for="person in allPersonsFiltered"
          :key="person.id"
          class="list-item"
          @click="onAddPersonToTask(person.id)"
        >
          {{ `${person.last} ${person.first}` }}
        </li>
      </ul>
      <t-button
        label="cancel"
        @clicked="showAddPersonModal = false"
        class="mt-1"
      />
    </t-modal>

    <t-button label="edit" @clicked="onEditClicked" class="mr-1" />
    <t-button
      v-if="task.status === 'started'"
      label="mark as done"
      @clicked="onChangeStatus('done')"
      :class="{'mr-1' : !personsInThisTask.length}"
    />
    <t-button
      v-else-if="task.status === 'done'"
      label="mark as started"
      @clicked="onChangeStatus('started')"
      :class="{'mr-1' : !personsInThisTask.length}"
    />
    <t-button v-if="!personsInThisTask.length" label="delete task" @clicked="onDeleteTaskClicked"/>

    <ul class="detail-list">
      <li>
        <div>task name:</div>
        <div class="text-bold pl-3 text-right">{{ task.task }}</div>
      </li>
      <li>
        <div>project name:</div>
        <div class="pl-3 text-right">{{ task.project }}</div>
      </li>
      <li>
        <div>description:</div>
        <div class="pl-3 text-right">{{ task.description }}</div>
      </li>
      <li>
        <div>status:</div>
        <div>{{ task.status }}</div>
      </li>
      <li>
        <div>priority:</div>
        <div>{{ task.priority }}</div>
      </li>
      <li>
        <div>deadline:</div>
        <div>{{ dateToDisplay }}</div>
      </li>
    </ul>
    <t-button label="add person" @clicked="onAddPersonClicked" />
    <person-list
      v-if="personsInThisTask.length"
      :persons="personsInThisTask"
      header="persons working on this task"
      @delete-person-task="onDeletePersonTask"
    />
    <h4 v-else>this task has no person assigned yet</h4>
  </template>
</template>

<script>
import TLoading from "../components/TLoading.vue";
import TButton from "../components/TButton.vue";
import TModal from "../components/TModal.vue";
import PersonList from "../components/PersonList.vue";
import db from "../utils/db.js";
import { formatDate } from "@/utils/dateUtils.js";

export default {
  name: "TaskDetailPage",
  props: "",
  data() {
    return {
      loading: true,
      task: {},
      showAddPersonModal: false,
      allPersons: [],
      personsInThisTask: [],
    };
  },
  computed: {
    dateToDisplay() {
      return formatDate(this.task.taskdate);
    },
    personsInTaskIds () {
      return this.personsInThisTask.map(item => item.personid)
    },
    allPersonsFiltered () {
      return this.allPersons.filter(item => {
        return this.personsInTaskIds.indexOf(item.id) < 0
      })
      .sort((a, b) => {
        let aFull = a.last + a.first
        let bFull = b.last + b.first
        return aFull.localeCompare(bFull)
      })
    }
  },
  created() {
    const prom1 = db
      .get("/tasks/" + this.$route.params.taskid)
      .then((record) => {
        this.task = record;
      });
    Promise.all([prom1, this.fetchPersonsForThisTask()]).then(() => {
      this.loading = false;
    });
  },
  methods: {
    fetchPersonsForThisTask() {
      return db.get("personstasks?taskid=" + this.$route.params.taskid).then(
        (data) => {
          this.personsInThisTask = data;
        }
      );
    },
    onEditClicked() {
      this.$router.push("/taskformedit/" + this.$route.params.taskid);
    },
    onChangeStatus(par) {
      db.put("/tasks/" + this.$route.params.taskid, {
        id: this.$route.params.taskid,
        status: par,
      }).then(() => {
        this.$router.push("/projects/" + this.task.projectid);
      });
    },
    onAddPersonClicked() {
      db.get("/persons").then((data) => {
        this.allPersons = data;
        this.showAddPersonModal = true;
      });
    },
    onDeletePersonTask(id) {
      db.delete("/personstasks", { id }).then(() => {
        this.fetchPersonsForThisTask();
      });
    },
    onAddPersonToTask(personid) {
      db.post("/personstasks", {
        personid,
        taskid: this.$route.params.taskid,
      }).then(() => {
        this.fetchPersonsForThisTask().then(() => {
          this.showAddPersonModal = false;
        });
      });
    },
    onDeleteTaskClicked () {
      db.delete('tasks', {id: this.$route.params.taskid}).then(() => {
        this.$router.push('/projects/' + this.task.projectid)
      })
    }
  },
  components: { TLoading, TButton, TModal, PersonList },
};
</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'
.list-item
  &:hover
    cursor: pointer
    background: $highlight
</style>
