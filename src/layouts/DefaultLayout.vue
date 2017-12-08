<script lang="coffee">
import MenuOverlay from 'components/MenuOverlay'

import 'transitions/DefaultLayoutTransition'
import 'transitions/JumpTransition'

export default DefaultLayout =
  name: 'default-layout'
  props:
    isNavActive:
      type: Boolean
      required: yes

    layoutColors:
      type: String
      required: yes
  beforeMount: ->
    @$router.app.$emit 'changeLayoutColors', 'accent'
  components:
    MenuOverlay: MenuOverlay

</script>

<template lang="html">
  <default-layout-transition>

    <div :class="['container', layoutColors]">
      <menu-overlay :is-active="isNavActive"/>
      <jump-transition>
        <div class="collapse expanded row" v-show="!isNavActive">
          <router-view></router-view>
        </div>
      </jump-transition>
    </div>

  </default-layout-transition>
</template>
