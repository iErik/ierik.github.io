<script lang="coffee">
export default AboutTitleSection =
  name: 'about-title-section'

</script>

<template lang="html">
  <div class="section-title bg-primary">
    <header class="wrapper-title">
      <h1 class="title">About</h1>
    </header>
  </div>
</template>

<style lang="sass">
@import ~styles/helpers/_module

$section-foreground-color: foreground-color()

.section-title
  display: flex
  justify-content: center

  width:  100%
  height: 100%

  transform: scale(1.0) !important

  .wrapper-title
    margin-top: 25%
    transform: scale(1.0) !important

    .title
      font-family: $font-decorative
      font-size:   4em
      color:       $section-foreground-color

</style>
