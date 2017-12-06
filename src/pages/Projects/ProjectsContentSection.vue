<script lang="coffee">
import _ from 'underscore'

import FloatingButton from 'components/FloatingButton'
import IconLink from 'components/IconLink'

import projects from 'markdown/projects'

export default ProjectsContentSection =
  name: 'projects-content-section'
  data: ->
    projectName = @$route.params.projectName || ''

    currentProject: projects[projectName] || _.values(projects)[0]
    scrollShadowState: ''

  mounted: ->
    @$nextTick () =>
      window.addEventListener('resize', @toggleScrollShadow.bind(this))
      projectDescription = @$el.getElementsByClassName('project-description')[0]

      if projectDescription.scrollHeight > projectDescription.clientHeight
        @scrollShadowState = 'show-shadow-bottom'
  beforeDestroy: ->
    window.removeEventListener('resize', @toggleScrollShadow)

  methods:
    toggleScrollShadow: (ev) ->
      el = @$el.getElementsByClassName('project-description')[0]
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

  components:
    FloatingButton: FloatingButton
    IconLink: IconLink

</script>

<template lang="html">
  <div class="wrapper-content bg-standard">
    <div class="content">

      <header class="project-header">
        <div class="project-avatar">
          <i :class="['avatar', currentProject.avatar]"></i>
        </div>

        <div class="project-label">
          <h1 class="label">{{ currentProject.name | capitalize }}</h1>
        </div>

        <div class="project-platforms">
          <ul class="project-platforms-icons l-flex">
            <li class="project-platform-icon"
              v-for="platform in currentProject.platforms">
              <icon-link class="colors-foreground" :icon="platform" to="/"/>
            </li>
          </ul>
        </div>
      </header>

      <div :class="['wrapper-description', scrollShadowState]">
        <div class="shadow-top"></div>

        <div class="project-description"
          v-html="currentProject.__content"
          @scroll="toggleScrollShadow">
        </div>

        <div class="shadow-bottom"></div>
      </div>

      <div class="project-controls colors-accent">
        <div class="project-control hide">
          <floating-button>More</floating-button>
        </div>
        <div class="project-control">
          <floating-button>
            <a :href="currentProject.repo" target="_blank">View on Github</a>
          </floating-button>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="sass">
@import ~styles/helpers/module

$section-foreground-color: foreground-color()

$project-avatar-size: 8.642em

$project-label-font-size: 4.9em

$project-platform-icon-scale: .625em

$project-description-padding: 5px 10px
$project-description-font-size: .92em
$project-description-text-align: center

.wrapper-content
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
    margin: 45px 0 30px 0

  .project-header
    display: flex
    flex-direction:  column
    justify-content: center
    align-items:     center

    flex-shrink: 0

    .project-avatar .avatar
      font-size: $project-avatar-size
      color:     $section-foreground-color

      &::before
        display: block
        line-height: 0.95

    .project-label .label
      font-weight: 100
      font-size:   $project-label-font-size
      color:       $section-foreground-color

      margin: 2px 0 10px

    .project-platform-icon
      font-size: $project-platform-icon-scale
      padding: 0 7px

  .wrapper-description
    position: relative
    overflow: hidden

    display: flex
    flex-direction: column

    margin: 10px 50px

    +media-breakpoint-up(xxlarge)
      margin: 10px 95px

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

  .project-description
    position: relative

    flex-grow: 1
    align-self: flex-end
    overflow: scroll

    padding: $project-description-padding
    //margin:  $project-description-margin

    &.shadow-top
      box-shadow: 0px 19px 23px -25px rgba(0, 0, 0, 0.35) inset
      border-top: 1px solid #fafafa08

    &.shadow-bottom
      box-shadow: 0px -19px 23px -25px rgba(0, 0, 0, 0.35) inset
      border-bottom: 1px solid #fafafa08

    p
      font-size:   $project-description-font-size
      font-weight: 300
      line-height: 1.4
      text-align:  $project-description-text-align
      color:       $section-foreground-color

      &:first-child
        margin-top: 0

  .project-controls
    display: flex
    //flex-grow: 1
    flex-shrink: 0
    justify-content: center

    //padding: 15px 0 25px

    .project-control
      margin: 0 15px

      .floating-button
        width: 20.625rem

</style>
