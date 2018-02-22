<script lang="coffee">
export default AboutTitleSection =
  name: 'about-title-section'

</script>

<template lang="html">
  <div class="section-title bg-primary">
    <header class="wrapper-title">
      <h1 class="title">Sobre</h1>
    </header>
  </div>
</template>

<style lang="sass" scoped>
@import ~styles/helpers/_module

$section-foreground-color: foreground-color()

.section-title
  display: flex
  justify-content: center

  position: relative

  width:  100%
  height: 100%

  transform: scale(1.0) !important
  transition: opacity 400ms

  .wrapper-title
    position: absolute
    top: 30%

    transform: scale(1.0) !important
    transition: inherit

    .title
      font-family: $font-decorative
      font-size:   4em
      color:       $section-foreground-color

      -webkit-font-smoothing: antialiased
      -moz-osx-font-smoothing: grayscale

      transition: transform 500ms, opacity 400ms

</style>
