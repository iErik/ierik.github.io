<script lang="coffee">
import _ from 'underscore'

import FloatingButton from 'components/FloatingButton'
import IconLink from 'components/IconLink'

import projects from 'markdown/projects'

export default ProjectsContentSection =
  name: 'projects-content-section'
  data: ->
    projectNames = Object.keys(projects)
    projectName = @$route.params.projectName

    currentProject: projects[projectName]
    nextProject: projectNames[projectNames.indexOf(projectName) + 1] || ''
    previousProject: projectNames[projectNames.indexOf(projectName) - 1] || ''
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
  <div class="section-content bg-standard">
    <div class="content">

      <header class="project-header">
        <div class="project-avatar">
          <router-link class="project-nav previous" v-if="previousProject"
            :to="`/projetos/${previousProject}`">
            <i class="icn-arrow-left"></i>
          </router-link>

          <i :class="['avatar', currentProject.avatar]"></i>

          <router-link class="project-nav next" v-if="nextProject"
            :to="`/projetos/${nextProject}`" >
            <i class="icn-arrow-right"></i>
          </router-link>
        </div>

        <div class="project-label">
          <h1 class="label">{{ currentProject.name | capitalize }}</h1>
        </div>

        <div class="project-platforms" v-if="currentProject.platforms">
          <ul class="project-platforms-icons l-flex">
            <li class="project-platform-icon"
              v-for="(value, key) in currentProject.platforms">
              <icon-link class="colors-foreground" :icon="key" :to="value"/>
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
        <div class="project-control">
          <floating-button>
            <a :href="currentProject.repo" target="_blank">Ver no Github</a>
          </floating-button>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="sass">
@import ~styles/helpers/module

$section-foreground-color: foreground-color()

$project-nav-icn-size: 2rem
$project-avatar-size: 8.642rem

$project-label-font-size: 4.9rem

$project-platform-icon-scale: .625rem

$project-description-padding: 5px 10px
$project-description-font-size: .85em
$project-description-text-align: center

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
    padding: 45px 0 30px 0

    +media-breakpoint-down(small)
      padding: 20px 0 12px 0

  .project-header
    display: flex
    align-items: center
    flex-direction: column
    justify-content: center

    flex-shrink: 0

    .project-avatar
      position: relative

      display: flex
      align-items: center

      .avatar
        font-size: $project-avatar-size
        color:     $section-foreground-color

        &::before
          display: block
          line-height: 0.95

      .project-nav
        position: absolute

        +media-breakpoint-up(xmedium)
          display: none

        &.previous
          left: -77%

        &.next
          right: -77%

        +icon
          display: flex
          font-size: $project-nav-icn-size

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

  .project-description
    position: relative

    flex-grow: 1
    align-self: flex-end
    overflow-y: auto

    max-height: 400px
    padding: $project-description-padding

    p
      font-size:   $project-description-font-size
      font-weight: 400
      line-height: 1.5
      text-align:  $project-description-text-align
      color:       $section-foreground-color

      -webkit-font-smoothing: antialiased
      -moz-osx-font-smoothing: grayscale

      &:first-child
        margin-top: 0

  .project-controls
    display: flex
    flex-shrink: 0
    justify-content: center

    .project-control
      margin: 0 15px

      .floating-button
        width: 20.625rem

</style>
