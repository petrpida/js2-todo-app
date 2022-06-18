<template>
  <div v-if="show" class="modal">
      <div class="modal-content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TModal',
  props: {
      show: Boolean
  }
}
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

.modal-content
    background: white
    max-width: 80%
    max-height: 80%
    padding: 1rem
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3)

</style>