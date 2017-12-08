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
      next({ path: "/projects/#{Object.keys(projects)[0]}" })
    else if Object.keys(projects).indexOf(to.params.projectName) == -1
      next('/404')
    else
      next()

</script>

<template lang="html">
  <div class="section-title bg-primary">
    <header class="wrapper-title">
      <h1 class="title">Projects</h1>

      <ul class="project-links">
        <li class="project-link" v-for="project in projects">
          <router-link :to="`/projects/${project}`">
            {{ project | dashToSpace | capitalize }}
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

  +media-breakpoint-up(xxlarge)
    margin-top: 33% !important

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
