<template>

<nav-bar/>

<router-view />

</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: { NavBar }
}
</script>

<style lang="stylus">
@import './styles/variables.styl'
@import './styles/transitions.styl'

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color $text
  padding-bottom 2rem

body, html
  margin: 0
  padding: 0

.bg-secondary
  background: $secondary

.text-light
  color: $text-light

.text-bold
  font-weight: bold

.mb-2
  margin-bottom: 2rem

.mr-1
  margin-right: 1rem

.mt-1
  margin-top: 1rem

.pr-1
  padding-right: 1rem

.p-1
  padding: 1rem

.pt-1
  padding-top: 1rem

.pl-3
  padding-left: 3rem

.text-small
  font-size: 0.8rem

.text-left
  text-align: left
  
.text-right
  text-align: right

.text-red
  color: red

form
  width: 80%
  max-width: 500px
  margin: 0 auto 3rem auto

.cursor-pointer
  cursor: pointer

.resize-none
  resize: none

.detail-list
  list-style-type: none
  margin: 2rem auto
  padding: 0
  width: 80%
  max-width: 550px
  & li
    display: flex
    justify-content: space-between
    padding: .5rem
    border-bottom: 1px solid $border-light

</style>
