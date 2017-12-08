<script lang="coffee">
import Vue from 'vue'

Vue.component 'slide-up-transition',
  functional: true
  render: (createElement, context) ->
    createElement 'transition',
      props:
        name: 'slide-up'
        type: 'animation'
    , context.children

</script>

<style lang="sass">
@import ~styles/vendors/animate/animate

//  Variables
//  ---------

//  Transition Enter Stage
//  ----------------------

.slide-up-enter
  opacity: 0.1
.slide-up-enter-to
  opacity: 1

.slide-up-enter-active
  position: absolute
  z-index: 5
  background-color: transparent !important

  transition: opacity 500ms ease-in

  animation-name: slideInUp
  animation-duration: 500ms
  animation-fill-mode: both
  
  *
    transform: scale(1) !important

//  Transition Leave Stage
//  ----------------------

.slide-up-leave
  opacity: 1
.slide-up-leave-to
  opacity: 0

.slide-up-leave-active
  position: absolute
  z-index: 5
  background-color: transparent !important

  transition: opacity 300ms

  animation-name: slideOutUp
  animation-duration: 500ms
  animation-fill-mode: both

  *
    transform: scale(1) !important

</style>
