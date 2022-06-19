<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="close">
        <svg
          @click="onClicked"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
          />
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TModal",
  props: {
    show: Boolean,
  },
  methods: {
      onClicked () {
          this.$emit('close-modal')
      }
  }
};
</script>

<style lang="stylus" scoped>
.modal
    position: fixed
    width: 100vw
    height: 100vh
    top: 0
    left: 0
    background: rgba(0, 0, 0, 0.5)
    display: flex
    justify-content: center
    align-items: center
    z-index: 1

.modal-content
    background: white
    max-width: 80%
    max-height: 80%
    padding: 1rem
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3)

.close
    display: flex
    justify-content: flex-end
    & svg
        cursor: pointer
</style>
