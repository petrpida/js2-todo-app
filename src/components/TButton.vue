<template>
  <button
    @click="onClick"
    :class="{ 'red': color === 'red', 'green': color === 'green' }"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "TButton",
  props: {
    label: String,
    color: {
      type: String,
      default: "",
    },
  },
  methods: {
    onClick() {
      this.$emit("clicked");
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'

button
  background: $secondary
  color: white
  margin-bottom: 1rem
  padding: .5em .8em
  font-size: 1.1rem
  border-radius: 5px
  font-weight: bold
  border: none
  cursor: pointer
  transition: all .3s ease
  &:hover
    background: darken($secondary, 10)
  &:active
    transform: scale(1.1)

.red
  background: red
  &:hover
    background: darken(red, 10)

.green
  background: green
  &:hover
    background: darken(green, 10)

</style>
