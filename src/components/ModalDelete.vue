<template>
  <t-modal :show="showModal" @close-modal="onCancelClicked">
    <p>
      <span>{{ question + " " }}</span>
      <span class="text-bold">{{ title }}</span>
      <span>?</span>
    </p>
    <t-button
      label="no, cancel"
      color="green"
      class="mr-1"
      @clicked="onCancelClicked"
    />
    <t-button label="yes, delete" color="red" @clicked="onDeleteClicked" />
  </t-modal>
</template>

<script>
import TModal from "./TModal.vue";
import TButton from "./TButton.vue";

export default {
  name: "ModalDelete",
  props: {
    question: {
      type: String,
      required: true,
    },
    title: {
      validator: (v) => typeof v === "string" || typeof v === "number",
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showDeleteModal: false,
    };
  },
  methods: {
    onDeleteClicked() {
      this.$emit("delete-clicked");
    },
    onCancelClicked() {
      this.$emit("cancel-clicked");
    },
  },
  components: { TModal, TButton },
};
</script>

<style></style>
