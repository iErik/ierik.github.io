<script lang="coffee">
import Vue from 'vue'

Vue.component 'slide-down-transition',
  functional: true
  render: (createElement, context) ->
    createElement 'transition',
      props:
        name: 'slide-down'
        type: 'animation'
    , context.children

</script>

<style lang="sass">
@import ~styles/vendors/animate/animate

//  Variables
//  ---------


//  Transition Enter Stage
//  ----------------------

.slide-down-enter
  opacity: 0.1
.slide-down-enter-to
  opacity: 1

.slide-down-enter-active
  position: absolute
  z-index: 5
  background-color: transparent !important

  transition: opacity 500ms ease-in

  animation-name: slideInDown
  animation-duration: 500ms
  animation-fill-mode: both
  
  *
    transform: scale(1) !important

//  Transition Leave Stage
//  ----------------------

.slide-down-leave
  opacity: 1
.slide-down-leave-to
  opacity: 0

.slide-down-leave-active
  position: absolute
  z-index: 5
  background-color: transparent !important

  transition: opacity 300ms

  animation-name: slideOutDown
  animation-duration: 500ms
  animation-fill-mode: both

  *
    transform: scale(1) !important

</style>
