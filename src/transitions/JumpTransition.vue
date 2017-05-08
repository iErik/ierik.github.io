<script lang="coffee">
import Vue from 'vue'

Vue.component 'jump-transition',
  functional: true,
  render: (createElement, context) ->
    createElement 'transition',
      props:
        name: 'jump'
    , context.children

</script>

<style lang="sass">

//  Transition Enter Stage
//  ----------------------

.jump-enter *
  transform: scale(0.5)
  opacity: 0.5

.jump-enter-to *
  transform: scale(1)
  opacity: 1

.jump-enter-active
  transition: transform 500ms ease-in, opacity 650ms ease-in

  *
    transition: transform 500ms ease-in, opacity 650ms ease-in !important

//  Transition Leave Stage
//  ----------------------

.jump-leave *
  transform: scale(1.0, 1.0)
  opacity: 1

.jump-leave-to *
  transform: scale(0.5)
  opacity: 0.5

.jump-leave-active
  transition: transform 500ms ease-in, opacity 650ms ease-in

  *
    transition: transform 500ms ease-in, opacity 650ms ease-in !important

</style>
