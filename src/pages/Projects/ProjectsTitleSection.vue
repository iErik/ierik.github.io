<script lang="coffee">
import projects from 'markdown/projects'

export default ProjectsTitleSection =
  name: 'projects-title-section'
  data: ->
    projects: Object.keys(projects)
    projectTransition: 'transition'

  beforeRouteUpdate: (to, from, next) ->
    nextProject = @projects.indexOf to.params.projectName
    lastProject = @projects.indexOf from.params.projectName

    if nextProject > lastProject
      @$router.app.$emit('changeTransition', 'slide-left')
    else
      @$router.app.$emit('changeTransition', 'slide-right')

    next()

  beforeRouteEnter: (to, from, next) ->
    if !to.params.projectName
      next({ path: "/projetos/#{Object.keys(projects)[0]}" })
    else if Object.keys(projects).indexOf(to.params.projectName) == -1
      next('/404')
    else
      next()

</script>

<template lang="html">
  <div class="section-title bg-primary">
    <header class="wrapper-title">
      <h1 class="title">Projetos</h1>

      <ul class="project-links">
        <li class="project-link" v-for="project in projects">
          <router-link :to="`/projetos/${project}`">
            {{ project | camelToSpace | capitalize }}
          </router-link>
        </li>
      </ul>

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

    margin: 0.67em 0 20px
    transition: transform 500ms, opacity 400ms

  .project-links
    display: flex
    justify-content: center

    transition: transform 500ms, opacity 400ms

    .project-link
      display: flex

      font-weight: 600
      font-size:   0.65em
      color:       $section-foreground-color

      text-transform: uppercase
      letter-spacing: 0.3px

      -webkit-font-smoothing: antialiased
      -moz-osx-font-smoothing: grayscale

      transition: transform 500ms, opacity 400ms

      a
        color: inherit
        transition: inherit

      &::after
        content: ""
        display: block
        align-self: center

        width:  4px
        height: 4px

        border-radius: 100%
        margin: 2px 12px 0 12px

        background-color: accent-color(light)

      &:last-child::after
        display: none

</style>
