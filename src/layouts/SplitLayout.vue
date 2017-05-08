<script lang="coffee">
import MenuOverlay from 'components/MenuOverlay'
import { routes } from 'config/router'

import 'transitions/SplitLayoutTransition'
import 'transitions/SlideLeftTransition'
import 'transitions/SlideRightTransition'
import 'transitions/SlideUpTransition'
import 'transitions/SlideDownTransition'

export default SplitLayout =
  name: 'split-layout'
  props:
    isNavActive:
      type: Boolean
      required: yes
  data: ->
    transitionName: 'transition'
    routes: routes.reduce (memo, route) ->
      if route.abstract && route.name == 'split-layout'
        route.children.map (subRoute) -> subRoute.name
    , []
  watch:
    '$route': (to, from) ->
      if @routes.indexOf(to.name) > @routes.indexOf(from.name)
        @transitionName = 'slide-up-transition'
      else if @routes.indexOf(to.name) < @routes.indexOf(from.name)
        @transitionName = 'slide-down-transition'
  created: ->
    @$router.app.$on 'changeTransition', (transitionName) =>
      @transitionName = "#{transitionName}-transition"

    @$router.app.$emit 'changeLayoutColors', 'foreground'
  components:
    MenuOverlay: MenuOverlay

</script>

<template lang="html">
  <split-layout-transition>

    <main class="collapsed container colors-foreground">
      <section :class="['left-column small-6 columns', { 'fade-out': isNavActive }]">
        <menu-overlay :isActive="isNavActive" :isAbsolute="true" />
        <div class="contents small-12 columns">
          <router-view name="leftColumn" />
        </div>
      </section>

      <section class="right-column small-6 columns">
        <component :is="transitionName">
          <router-view :key="$route.fullPath" name="rightColumn" />
        </component>
      </section>
    </main>

  </split-layout-transition>
</template>

<style lang="sass">
@import ~styles/helpers/_module

$left-column-background-color: primary-color()
$right-column-background-color: primary-color()

$show-column-separator: true
$column-separator-width: 1px
$column-separator-gap: 50px
$column-separator-color: rgba(foreground-color(), 0.3)

.left-column
  position: relative
  display: flex

  z-index: 10

  max-height: 100vh

  background-color: $left-column-background-color

  @if $show-column-separator
    &::before
      content: ""
      display: block

      position: absolute
      right: 0px

      z-index: 25

      width: 0px
      height: calc(100% - #{$column-separator-gap * 2})

      margin: $column-separator-gap 0

      border-right-width: $column-separator-width
      border-right-color: $column-separator-color
      border-right-style: solid

  &.fade-out
    .contents *
      transform: scale(0.5)
      opacity: 0.3

    +icon
      transform: scale(1.0) !important

  .contents
    z-index: 10

    *
      transition: transform 500ms, opacity 400ms

.right-column
  position: relative
  max-height: 100vh
  overflow-x: hidden

  z-index: 5

  background-color: $right-column-background-color

</style>
