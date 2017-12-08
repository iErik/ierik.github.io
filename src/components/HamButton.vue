<script lang="coffee">

export default HamButton =
  name: 'ham-button'
  props:
    isActive:
      type: Boolean
      required: yes
    value:
      type: Boolean
      required: yes
  methods:
    emitChange: ->
      @$emit 'input', !this.value

</script>

<template lang="html">
  <button @click="emitChange()" type="button"
    :class="[{ 'is-active': isActive }, 'c-hamburger', 'c-hamburger--htx']">
    <span class="c-hamburger-bars"></span>
  </button>
</template>

<style lang="sass">
@import ~styles/helpers/_module

$button-width: 2.125em
$button-height: 2.125em
$bar-thickness: 0.25em
$button-pad: 0.25em

$button-bar-space: 0.3125em
$button-bar-color: accent-color()

$button-transistion-duration: 0.3s

.c-hamburger
  display: block
  position: relative
  overflow: hidden
  z-index: 35

  width:  $button-width
  height: $button-height

  font-size: 1em

  text-indent: -9999px

  margin:  0
  padding: 0

  appearance: none
  box-shadow: none
  border-radius: none
  border: none
  cursor: pointer

  transition: background $button-transistion-duration

  .c-hamburger-bars
    display: block

    position: absolute
    top: ($button-height / 2) - ($bar-thickness / 2)
    left: $button-pad
    right: $button-pad

    //height: $bar-thickness
    height: Em2Px($bar-thickness)
    background-color: $button-bar-color

    &::after,
    &::before
      content: ""
      display: block

      position: absolute
      left: 0

      width: 100%
      //height: $bar-thickness
      height: Em2Px($bar-thickness)
      background-color: $button-bar-color

    &::after
      bottom: -$bar-thickness - $button-bar-space
    &::before
      top: -$bar-thickness - $button-bar-space

  @each $palette, $colors in $theme
    +repeat-block(('.colors-#{$palette} &', '&.colors-#{$palette}'))
      .c-hamburger-bars
        background-color: call(#{$palette}-color)

        &::after, &::before
          background-color: call(#{$palette}-color)

.c-hamburger--htx
  background-color: transparent

  .c-hamburger-bars
    transition: background-color 0s ease $button-transistion-duration

    &::after,
    &::before
      transition-duration: $button-transistion-duration, $button-transistion-duration
      transition-delay: $button-transistion-duration, 0s

    &::after
      transition-property: bottom, transform
    &::before
      transition-property: top, transform

  &.is-active
    .c-hamburger-bars
      background: none

      &::after
        bottom: 0px
        transform: rotate(-45deg)
      &::before
        top: 0px
        transform: rotate(45deg)

      &::after,
      &::before
        transition-delay: 0s, $button-transistion-duration, 0s

</style>
