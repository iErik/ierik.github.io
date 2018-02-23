<script lang="coffee">

export default PageNotFound =
  name: 'page-not-found'
  mounted: ->
    @$router.app.$emit 'changeLayoutColors', 'foreground'

</script>

<template lang="html">
  <div class="full-width row align-center">
    <div class="wrapper-404 column small-12">
      <h1 class="err-code type-decorative">Error 404</h1>
      <h2 class="err-msg t-lighter">The page you were looking for could not be found.</h2>
    </div>
  </div>
</template>

<style lang="sass">
@import ~styles/helpers/_module

//  Wrapper
//  -------

.wrapper-404
  position: absolute
  top: 37.067545305%

  display: flex
  flex-direction: column
  align-items: center

  +media-breakpoint-down(small)
    padding: 0 50px !important

  .err-code
    font-size: 4.0625rem
    margin: 0 0 .8125rem 0

    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: antialiased

  .err-msg
    text-align: center
    letter-spacing: 1px
    line-height: 1.45

    margin: 0

</style>
