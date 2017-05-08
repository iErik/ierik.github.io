<script lang="coffee">
import projects from 'markdown/projects'

export default ProjectsTitleSection =
  name: 'projects-title-section'
  data: ->
    projects: Object.keys(projects)
  watch:
    '$route': (to, from) ->
      nextProject = @projects.indexOf to.params.projectName
      lastProject = @projects.indexOf from.params.projectName

      if nextProject > lastProject
        @$router.app.$emit('changeTransition', 'slide-left')
      else
        @$router.app.$emit('changeTransition', 'slide-right')

</script>

<template lang="html">
  <div class="section-title bg-primary">
    <header class="wrapper-title">
      <h1 class="title">Projects</h1>

      <ul class="project-links">
        <li class="project-link" v-for="project in projects">
          <router-link :to="`/projects/${project}`">
            {{ project | capitalize }}
          </router-link>
        </li>
      </ul>

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

    margin: 0.67em 0 20px

  .project-links
    display: flex
    justify-content: center

    .project-link
      display: flex

      font-weight: 400
      font-size:   0.7em
      color:       $section-foreground-color

      text-transform: uppercase

      &::after
        content: ""
        display: block
        align-self: center

        width:  4px
        height: 4px

        border-radius: 100%
        margin: 3px 15px 0 15px

        background-color: accent-color(light)

      &:last-child::after
        display: none

</style>
