<script lang="coffee">
import aboutMe from 'markdown/posts/AboutMe'

export default AboutContentSection =
  name: 'about-content-section'
  data: ->
    aboutMeText: aboutMe
    scrollShadowState: ''

  mounted: ->
    @$nextTick () =>
      window.addEventListener('resize', @toggleScrollShadow.bind(this))
      textBodyEl = @$el.getElementsByClassName('text-body')[0]

      if textBodyEl.scrollHeight > textBodyEl.clientHeight
        @scrollShadowState = 'show-shadow-bottom'
  beforeDestroy: ->
    window.removeEventListener('resize', @toggleScrollShadow)


  methods:
    toggleScrollShadow: (ev) ->
      el = @$el.getElementsByClassName('text-body')[0]
      scrollTop = el.scrollTop
      scrollHeight = el.scrollHeight - 5
      clientHeight = el.clientHeight

      if scrollHeight <= clientHeight
        @scrollShadowState = ''
        return

      if (scrollTop > 15) && (clientHeight + scrollTop < scrollHeight)
        @scrollShadowState = 'show-shadow-top show-shadow-bottom'
      else if (scrollTop < 20) && (clientHeight + scrollTop < scrollHeight)
        @scrollShadowState = 'show-shadow-bottom'
      else if scrollTop + clientHeight >= scrollHeight
        @scrollShadowState = 'show-shadow-top'
      else
        @scrollShadowState = ''

</script>

<template lang="html">
  <div class="section-content bg-standard">
    <div class="content">

      <header class="section-header">
        <i class="site-avatar icn-erik"></i>
      </header>

      <div :class="['wrapper-text', scrollShadowState]">
        <div class="shadow-top"></div>

        <div class="text-body typography"
          v-html="aboutMeText.__content"
          @scroll="toggleScrollShadow">
        </div>

        <div class="shadow-bottom"></div>
      </div>

    </div>
  </div>
</template>

<style lang="sass">
@import ~styles/helpers/_module

$section-foreground-color: foreground-color()

$site-avatar-size: 8rem

$text-font-size: 0.9em
$text-font-weight: 400
$text-line-height: 1.5
$text-alignment: center

.section-content
  display: flex
  flex-direction:  column
  justify-content: center

  position: absolute

  width:  100%
  height: 100%

  .content
    display: flex
    flex-direction: column
    justify-content: center

    height: 100%
    padding: 50px 5.856515373%

  .section-header
    display: flex
    align-items: center
    justify-content: center

    .site-avatar
      font-size: $site-avatar-size

  .wrapper-text
    position: relative
    overflow: hidden

    display: flex

    flex-direction: column

    margin: 0px 2.568493151%

    border-top: 1px solid rgba(0, 0, 0, 0.0)
    border-bottom: 1px solid rgba(0, 0, 0, 0.0)

    +media-breakpoint-up(xxlarge)
      margin: 10px 95px

    +media-breakpoint-down(small)
      margin: 10px 30px
      font-size: 13.5px

    .shadow-top, .shadow-bottom
      position: absolute
      z-index: 50
      left: 1%

      width:  98%
      height: 17px

      border-radius: 48%

      box-shadow: 0px 0px 17px 0px rgba(0, 0, 0, 0.0)
      transition: box-shadow 350ms ease-in-out

      &.shadow-top
        top: -17px
      &.shadow-bottom
        bottom: -17px

    &.show-shadow-top
      border-top: 1px solid rgba($section-foreground-color, 0.04)

      .shadow-top
        box-shadow: 0px 4px 17px 0px rgba(0, 0, 0, 0.37)

    &.show-shadow-bottom
      border-bottom: 1px solid rgba($section-foreground-color, 0.04)

      .shadow-bottom
        box-shadow: 0px -4px 17px 0px rgba(0, 0, 0, 0.3)

    .text-body
      flex-grow: 1
      overflow-y: auto

      padding: 5px 3.496314011%

      p
        font-size:   $text-font-size
        font-weight: $text-font-weight
        line-height: $text-line-height
        text-align:  $text-alignment
        color:       $section-foreground-color

        letter-spacing: 0.3px

        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale

        &:first-child
          margin-top: 0


</style>
