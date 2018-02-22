<script lang="coffee">

export default FloatingButton =
  name: 'floating-button'

</script>

<template lang="html">
  <button type="button" class="floating-button">
    <span class="label">
      <slot></slot>
    </span>
  </button>
</template>

<style lang="sass">
@import ~styles/helpers/_module

$button-background-color: accent-color()
$button-border-color: accent-color()
$button-label-color: accent-color()
$button-label-hover-color: background-color() !important

$button-box-shadow-color: rgba(lighten(accent-color(), 10%), 0.65)
$button-box-shadow: 0px 6px 11px -1px

.floating-button
  position: relative
  z-index: 5

  appearance: none
  cursor: pointer

  width: 11.875rem

  background-color: transparent
  border: 1px solid $button-border-color
  border-radius: 25px

  padding: 11px 0

  transition: background-color 500ms

  &::after
    content: ""
    display: block
    width: 100%
    height: 100%

    position: absolute
    z-index: -1
    top: 0px

    background-color: transparent

    border-radius: 20px

    box-shadow: $button-box-shadow $button-box-shadow-color

    opacity: 0
    transition: opacity 450ms ease-in-out

  .label
    display: flex
    justify-content: center
    align-items: center

    font-family: $font-sans
    font-weight: 400
    font-size:   1rem
    line-height: 1
    letter-spacing: 0.4px
    color: $button-label-color

    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale

    transition: color 400ms

    a
      color: inherit

  &:hover
    background-color: $button-background-color

    &::after
      opacity: 1

    .label
       color: $button-label-hover-color

  @each $palette, $colors in $theme
    +repeat-block(('.colors-#{$palette} &', '&.colors-#{$palette}'))
      border-color: call(#{$palette}-color) !important

      .label
        color: call(#{$palette}-color)

      &::after
        $box-shadow-color: rgba(lighten(call(#{$palette}-color), 10%), 0.65)
        box-shadow: $button-box-shadow $box-shadow-color


      &:hover
        background-color: call(#{$palette}-color)

        @if $palette == 'foreground'
          .label
            color: background-color()
        @else
          .label
            color: foreground-color()

</style>
