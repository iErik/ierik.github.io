<script lang="coffee">
import Vue from 'vue'

Vue.component 'slide-left-transition',
  functional: true
  render: (createElement, context) ->
    createElement 'transition',
      props:
        name: 'slide-left'
        type: 'animation'
    , context.children

</script>

<style lang="sass">
@import ~styles/vendors/animate/animate

//  Variables
//  ---------

//  Transition Enter Stage
//  ----------------------

.slide-left-enter
  opacity: 0.1
.slide-left-enter-to
  opacity: 1

.slide-left-enter-active
  position: absolute
  z-index: 5
  background-color: transparent !important

  transition: opacity 500ms ease-in

  animation-name: slideInRight
  animation-duration: 500ms
  animation-fill-mode: both

//  Transition Leave Stage
//  ----------------------

.slide-left-leave
  opacity: 1
.slide-left-leave-to
  opacity: 0

.slide-left-leave-active
  position: absolute
  z-index: 5
  background-color: transparent !important

  transition: opacity 300ms

  animation-name: slideOutLeft
  animation-duration: 500ms
  animation-fill-mode: both

</style>
