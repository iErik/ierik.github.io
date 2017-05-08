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
  components:
    FloatingButton: FloatingButton
    IconLink: IconLink

</script>

<template lang="html">
  <div class="section-content bg-standard">
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

    <div class="project-description"
      v-html="currentProject.__content">
    </div>

    <div class="project-controls colors-accent">
      <div class="project-control">
        <floating-button>More</floating-button>
      </div>
      <div class="project-control">
        <floating-button>
          <a :href="currentProject.repo" target="_blank">View on Github</a>
        </floating-button>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import ~styles/helpers/_module

$section-foreground-color: foreground-color()

$project-avatar-size: 8.642em

$project-label-font-size: 4.9em

$project-platform-icon-scale: .625em

$project-description-padding: .3125em 3.125em
$project-description-font-size: .92em
$project-description-text-align: center

.section-content
  display: flex
  flex-direction:  column
  justify-content: center

  position: absolute;

  width:  100%
  height: 100%

  .project-header
    display: flex
    flex-direction:  column
    justify-content: center
    align-items:     center

    padding: 45px 0 0

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

  .project-description
    flex-grow: 1
    align-self: flex-end
    overflow: scroll

    padding: $project-description-padding

    p
      font-size:   $project-description-font-size
      font-weight: 300
      line-height: 1.4
      text-align:  $project-description-text-align
      color:       $section-foreground-color

  .project-controls
    display: flex
    flex-grow: 1
    justify-content: center

    padding: 15px 0 25px

    .project-control
      margin: 0 15px

</style>
