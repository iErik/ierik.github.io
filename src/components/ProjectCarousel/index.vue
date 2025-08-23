<template>
  <div class="project-carousel" ref="carousel">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue'

const carouselEl = useTemplateRef('carousel')

// TODO: On each arrow click, we must scroll vertically one
// unit, which is equivalent to the size of the contained
// elements, so that the next element which is out of view
// comes into view

onMounted(() => {

})
</script>

<style lang="scss" scoped>

.project-carousel {

}
</style>
