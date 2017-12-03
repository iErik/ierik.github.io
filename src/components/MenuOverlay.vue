<script lang="coffee">
import { routes } from 'config/router'

export default MenuOverlay =
  name: 'menu-overlay'
  props:
    isActive:
      type: Boolean
      required: true

    isAbsolute:
      type: Boolean
      required: false
      'default': false
  methods:
    # NOTE: This is the bad code i was talking about
    toggleNav: -> setTimeout(() => @$router.app.$emit 'toggleNav', 0);

</script>

<template lang="html">
  <nav :class="[{
    'is-active': isActive,
    'is-absolute': isAbsolute,
  }, 'menu-overlay']">

    <ul class="menu-overlay-entries">
      <li class="menu-overlay-entry" v-if="$route.name !== 'homepage' "
        @click="toggleNav()">
        <router-link class="entry-link" to='/'>Homepage</router-link>
      </li>
      <li class="menu-overlay-entry" v-if="$route.name !== 'about'"
        @click="toggleNav()">
        <router-link class="entry-link" to='/about'>About</router-link>
      </li>
      <li class="menu-overlay-entry" v-if="$route.name !== 'projects' "
        @click="toggleNav()">
        <router-link class="entry-link" to='/projects'>Projects</router-link>
      </li>
      <li class="menu-overlay-entry" v-if="$route.name !== 'contact'"
        @click="toggleNav()">
        <router-link class="entry-link" to='/contact'>Contact</router-link>
      </li>
    </ul>

  </nav>
</template>

<style lang="sass">
@import ~styles/helpers/_module

$nav-overlay-opacity-in-speed: 500ms
$nav-overlay-opacity-out-speed: 450ms

$nav-overlay-transform-in-speed: 300ms
$nav-overlay-transform-out-speed: 400ms

$nav-entry-font-color: accent-color()
$nav-hover-entry-font-color: accent-color(light)

.menu-overlay
  display: flex
  justify-content: center
  align-items: center

  position: fixed
  z-index: -20
  top: 0px
  left: 0px

  width: 100vw
  height: 100vh

  background-color: background-color()

  opacity: 0 !important
  transition-property: opacity, z-index
  transition-duration: $nav-overlay-opacity-out-speed, 0s
  transition-delay:    0s, $nav-overlay-opacity-out-speed
  transition-timing-function: ease-out

  *
    transform: scale(2)
    transition: transform $nav-overlay-transform-out-speed ease-out

  &.is-active
    opacity: 1 !important
    z-index: 20
    transition: opacity $nav-overlay-opacity-in-speed ease-in

    *
      transform: scale(1)
      transition-property: transform
      transition-duration: $nav-overlay-transform-in-speed
      transition-timing-function: cubic-bezier(.67,.26,.74,.38)

  &.is-absolute
    position: absolute
    width: 100%
    height: 100%

  @each $palette, $colors in $theme
    +repeat-block(('.colors-#{$palette} &', '&.colors-#{$palette}'))
      .entry-link
        color: call(#{$palette}-color) !important

        &:hover
          color: call(#{$palette}-color, light) !important

.menu-overlay-entries
  margin: 0
  padding: 0

  .menu-overlay-entry
    position: relative

    text-align: center

    margin: 25px 0

    .entry-link
      font-family: $font-decorative
      font-size: 33px
      color: $nav-entry-font-color

      -webkit-font-smoothing: antialiased !important
      -webkit-transform: translateZ(0px) !important

      transition: color 200ms

      &:hover
        color: $nav-hover-entry-font-color

</style>
