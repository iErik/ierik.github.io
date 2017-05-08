<script lang="coffee">
import Vue from 'vue'
import { bus } from './TransitionBus'

Vue.component 'default-layout-transition',
  functional: true
  render: (createElement, context) ->
    createElement 'transition',
      props:
        name: 'home'
      on:
        beforeEnter: (el, done) ->
          el.style.display = 'none'
        enter: (el, done) ->
          pendingEnter = () =>
            el.style.display = ''
            el.addEventListener 'animationend', () => done()

          if bus.$data.hasPendingLeave
            bus.$once 'next', pendingEnter
          else
            pendingEnter()
        enterCancelled: (el, done) ->
          bus.$off 'next'
        leave: (el, done) ->
          bus.$data.hasPendingLeave = yes
          menuOverlay = el.getElementsByClassName('menu-overlay')[0]

          menuOverlay.className = 'menu-overlay'

          menuOverlay.addEventListener 'transitionend', (ev) =>
            if ev.propertyName == 'transform'
              done()
              bus.$emit 'next'
              bus.$data.hasPendingLeave = no
    , context.children

</script>

<style lang="sass">

//  Transition Enter Stage
//  ----------------------

@keyframes BouceIn
  from
    transform: scale(0.7)
    opacity: 0

  to
    transform: scale(1)
    opacity: 1

.home-enter-active
  animation: BouceIn 400ms

//  Transition Leave Stage
//  ----------------------

</style>
