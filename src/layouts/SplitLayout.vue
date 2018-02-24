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

    <main class="collapsed container colors-foreground site-main">
      <header class="mobile-header">
        <div class="contents">
          <span class="page-title type-decorative">
            {{ $route.name | dashToSpace | capitalize }}
          </span>
        </div>

        <menu-overlay :isActive="isNavActive" :isAbsolute="false" />
      </header>

      <section :class="['left-column xmedium-6 columns', { 'fade-out': isNavActive }]">

        <menu-overlay :isActive="isNavActive" :isAbsolute="true" />
        <div class="contents small-12 columns">
          <router-view name="leftColumn" />
        </div>

      </section>

      <section :class="['right-column small-12 xmedium-6 columns', { 'fade-out': isNavActive }]">
        <component :is="transitionName">
          <router-view :key="$route.fullPath" name="rightColumn" />
        </component>
      </section>
    </main>

  </split-layout-transition>
</template>

<style lang="sass">
@import ~styles/helpers/module

//  Variables
//  ---------

$mobile-header-height: 70px
$mobile-header-background-color: primary-color()
$mobile-header-border-color: rgba(foreground-color(), 0.12)

$left-column-background-color: primary-color()
$right-column-background-color: primary-color()

$show-column-separator: true
$column-separator-width: 1px
$column-separator-gap: 50px
$column-separator-color: rgba(foreground-color(), 0.3)

//  Rules
//  -----

.site-main
  +media-breakpoint-down(medium)
    padding-top: $mobile-header-height

.mobile-header
  +media-breakpoint-up(xmedium)
    display: none

  .contents
    position: fixed
    z-index:  150
    top:  0px
    left: 0px

    width:  100%
    height: $mobile-header-height

    display: flex
    align-items: center
    justify-content: center

    background-color: $mobile-header-background-color
    box-shadow: 0px 3px 17px -6px rgba(0, 0, 0, 0.26)

    border-bottom: 1px solid
    border-color: $mobile-header-border-color

    .page-title
      font-size: 2.076923077rem

      letter-spacing: 4px
      text-transform: uppercase

      -webkit-font-smoothing: antialiased
      -moz-osx-font-smoothing: grayscale

.left-column
  position: relative
  display: flex

  z-index: 10

  max-height: 100vh

  background-color: $left-column-background-color

  +media-breakpoint-down(medium)
    display: none

  // TODO: Lower the scale of the page in between xmedium and large widths

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
      opacity: 0.25

    +icon
      transform: scale(1.0) !important

  .contents
    z-index: 10

.right-column
  position: relative
  max-height: 100vh
  overflow: hidden

  z-index: 5

  background-color: $right-column-background-color

  +media-breakpoint-down(medium)
    &.fade-out
      .section-content *
        transform: scale(0.5)
        opacity: 0.3

      +icon
        transform: scale(1.0) !important

    .section-content
      z-index: 10

      *
        transition: transform 500ms, opacity 400ms


</style>
