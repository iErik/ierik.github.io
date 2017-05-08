<script lang="coffee">
import Vue from 'vue'

Vue.component 'slide-right-transition',
  functional: true
  render: (createElement, context) ->
    createElement 'transition',
      props:
        name: 'slide-right'
        type: 'animation'
    , context.children

</script>

<style lang="sass">
@import ~styles/vendors/animate/animate

//  Variables
//  ---------

//  Transition Enter Stage
//  ----------------------

.slide-right-enter
  opacity: 0.1
.slide-right-enter-to
  opacity: 1

.slide-right-enter-active
  position: absolute
  z-index: 5
  background-color: transparent !important

  transition: opacity 500ms ease-in

  animation-name: slideInLeft
  animation-duration: 500ms
  animation-fill-mode: both

//  Transition Leave Stage
//  ----------------------

.slide-right-leave
  opacity: 1
.slide-right-leave-to
  opacity: 0

.slide-right-leave-active
  position: absolute
  z-index: 5
  background-color: transparent !important

  transition: opacity 300ms

  animation-name: slideOutRight
  animation-duration: 500ms
  animation-fill-mode: both

</style>
