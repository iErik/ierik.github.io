<script lang="coffee">
export default AboutContentSection =
  name: 'about-content-section'

</script>

<template lang="html">
  <div class="section-content bg-standard">

  </div>
</template>

<style lang="sass">
@import ~styles/helpers/_module

$section-foreground-color: foreground-color()

.section-content
  display: flex
  flex-direction:  column
  justify-content: center

  position: absolute

  width:  100%
  height: 100%
</style>
