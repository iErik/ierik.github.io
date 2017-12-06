<script lang="coffee">

export default IconLink =
  name: 'icon-link'
  props:
    to:
      type: [String, Object]
      required: yes
    icon:
      type: String
      required: yes
  computed:
    iconClass: -> "icn-#{@icon.trim()}"

</script>

<template lang="html">
  <a :href="to" class="icon-link" :target="'_blank'">
    <i :class="iconClass"></i>
  </a>
</template>

<style lang="sass">
@import ~styles/helpers/_module

$link-width: 3.5em
$link-height: 3.5em
$link-border-width: 2px
$link-border-color: accent-color()

$link-background-color: accent-color()

$icon-font-size: 2em
$icon-color: accent-color()

.icon-link
  display: flex
  align-items: center
  justify-content: center
  box-sizing: content-box

  width:  $link-width
  height: $link-height
  overflow: hidden

  cursor: pointer

  border: $link-border-width solid
  border-color: $link-border-color
  border-radius: 100%

  background-color: transparent

  transition: background-color 500ms

  +icon
    display: flex
    align-items: center
    justify-content: center

    font-size: $icon-font-size
    color:     $icon-color

    transition: color 600ms

  &:hover
    background-color: $link-background-color

    +icon
      color: background-color() !important

  @each $palette, $colors in $theme
    .colors-#{$palette} &,
    &.colors-#{$palette}
      border-color: call(#{$palette}-color)

      +icon
        color: call(#{$palette}-color)

      &:hover
        background-color: call(#{$palette}-color)

</style>
