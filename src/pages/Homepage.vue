<script lang="coffee">
import siteConfig from 'config/config'
import IconLink from 'components/IconLink'

export default Homepage =
  name: 'homepage'
  data: ->
    contactLinks: siteConfig.contactLinks

  mounted: ->
    @$router.app.$emit 'changeLayoutColors', 'accent'

  components:
    IconLink: IconLink

</script>

<template lang="html">
  <div class="full-width row align-center">
    <div class="wrapper-hero colors-accent column">
      <div class="site-header column small-12">
        <div class="row align-center align-top">
          <i class="site-avatar icn-erik"></i>
        </div>
        <div class="row align-center">
          <h1 class="site-caption">Erik Isidore</h1>
        </div>
      </div>
      <div class="row column">
        <ul class="contact-links row align-center">
          <li v-for="contactLink in contactLinks" class="contact-link">
            <icon-link
             :to="contactLink.url + contactLink.profile"
             :icon="contactLink.icon"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import ~styles/helpers/_module

//  Wrapper
//  -------

.wrapper-hero
  position: absolute
  top: 15%

  +media-breakpoint-up(xxlarge)
    top: 24%

  +media-breakpoint-down(small)
    font-size: 12px
    top: 24%

//  Header Section
//  --------------

.site-header

  .site-avatar
    font-size: 7em
    color: accent-color()

  .site-caption
    font-weight: 100
    font-size:   5em
    text-align:  center
    color: accent-color()

    margin: 0

//  Links Section
//  -------------

.contact-links
  margin: 20px 0 0

.contact-link
  list-style-type: none
  margin: 0 1.375em

  +media-breakpoint-down(small)
    margin: 0 0.833333333em

  .icon-link
    +icon
      &.icn-github
        font-size: 3.3em
        align-self: flex-end
        margin-bottom: -5px

      &.icn-gitlab
        font-size: 2.5em

</style>
