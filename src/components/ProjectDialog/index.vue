<template>
  <dialog
    ref="dialogEl"
    class="project-dialog"
    :aria-labelledby="titleId"
    @click="onDialogClick"
    @close="onClose"
  >
    <button
      type="button"
      class="close"
      :aria-label="t('pages.portfolio.close')"
      @click="close"
    >
      <Icon class="icon" name="Close" :size="20" />
    </button>

    <!-- data-lenis-prevent: Lenis is stopped while this is
         open, and without it would swallow the wheel here
         too -->
    <div v-if="shown" class="frame" data-lenis-prevent>
      <figure v-if="screen" class="screen">
        <img
          :key="screen.src"
          class="image"
          :src="screen.src"
          :srcset="screen.srcset"
          sizes="(min-width: 1132px) 1100px,
            calc(100vw - 32px)"
          :width="screen.width"
          :height="screen.height"
          :alt="screen.alt"
          loading="lazy"
          decoding="async"
        >
      </figure>

      <div v-if="shown.screens.length > 1" class="thumbs">
        <button
          v-for="(thumb, index) in shown.screens"
          :key="thumb.src"
          type="button"
          :class="['thumb', index === screenIndex && '-active']"
          :aria-label="thumb.alt"
          :aria-pressed="index === screenIndex"
          @click="screenIndex = index"
        >
          <img
            class="image"
            :src="thumb.src"
            :srcset="thumb.srcset"
            sizes="120px"
            alt=""
            loading="lazy"
            decoding="async"
          >
        </button>
      </div>

      <div class="body">
        <div class="wrap">
          <div class="title-row">
            <span v-if="shown.icon" class="icn-wrap">
              <Icon class="icon" :name="shown.icon" :size="36" />
            </span>

            <h3 :id="titleId" class="title">
              {{ shown.name }}
            </h3>

            <ProjectTags
              class="tags"
              :kind="shown.kind"
              :tags="shown.tags"
            />
          </div>

          <div
            v-if="shown.description"
            class="description"
            v-html="shown.description"
          />

          <div v-if="shown.links.length" class="links">
            <Button
              v-for="link in shown.links"
              :key="link.to"
              is-link
              external
              :to="link.to"
              :icon="link.icon"
              :label="link.label"
            />
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import {
  computed,
  onBeforeUnmount,
  ref,
  useId,
  watch
} from 'vue'
import { useI18n } from 'vue-i18n'

import Button from '@components/Button/index.vue'
import Icon from '@components/Icon/index.vue'
import ProjectTags from '@components/ProjectTags/index.vue'
import {
  pauseScroll,
  resumeScroll
} from '@composables/useLenis'
import type { ProjectType } from '@/types'


const props = defineProps<{
  project: ProjectType | null
}>()

const emit = defineEmits<{
  close: []
}>()


const { t } = useI18n()
const titleId = useId()

const dialogEl = ref<HTMLDialogElement | null>(null)
const screenIndex = ref(0)

// Outlives props.project on close, so the fade-out still
// has content to fade
const shown = ref<ProjectType | null>(null)

const screen = computed(() => shown.value
  ?.screens[screenIndex.value])

// The parent passes a fresh object when the locale
// changes, which only re-renders an open dialog
watch(() => props.project, project => {
  const dialog = dialogEl.value
  if (!dialog) return

  if (!project) {
    if (dialog.open) dialog.close()
    return
  }

  shown.value = project
  if (dialog.open) return

  screenIndex.value = 0
  dialog.showModal()
  pauseScroll()
})

const close = () => dialogEl.value?.close()

// Every way out - Esc, the button, the backdrop - ends in
// the native close event, so cleanup lives only here.
// It fires after the dialog has closed, so `open` is
// already false - don't guard on it
const onClose = () => {
  resumeScroll()
  emit('close')
}

// A click on the ::backdrop is reported on the dialog
// itself; the frame fills the whole box, so anything
// inside has a descendant as its target
const onDialogClick = (event: MouseEvent) => {
  if (event.target === dialogEl.value) close()
}

onBeforeUnmount(() => {
  if (dialogEl.value?.open) resumeScroll()
})
</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';
@use '@styles/utils/motion';

$duration: 250ms;

.project-dialog {
  position: fixed;
  inset: 0;

  // Every cover is 16:10, so capping the width at 1.6x the
  // image's 70vh height limit lets the screen fill the
  // dialog edge to edge, instead of leaving dark bars at
  // its sides on shorter viewports
  width: min(calc(100% - 32px), 1100px, calc(70vh * 1.6));
  width: min(calc(100% - 32px), 1100px, calc(70dvh * 1.6));
  max-width: none;
  max-height: 90vh;
  max-height: 90dvh;

  margin: auto;
  padding: 0;
  overflow: hidden;

  border: 1px solid rgba(199, 198, 198, .38);
  border-radius: 12px;
  background-color: rgba(18, 20, 26, .82);
  backdrop-filter: blur(40px);
  color: var(--color-fg);

  opacity: 0;
  transform: scale(.98);

  // overlay and display keep it in the top layer, and
  // rendered, for the length of the closing fade
  transition:
    opacity $duration,
    transform $duration motion.$reveal-ease,
    overlay $duration allow-discrete,
    display $duration allow-discrete;

  &[open] {
    display: flex;
    flex-direction: column;

    opacity: 1;
    transform: none;
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0);

    transition:
      background-color $duration,
      backdrop-filter $duration,
      overlay $duration allow-discrete,
      display $duration allow-discrete;
  }

  &[open]::backdrop {
    background-color: rgba(0, 0, 0, .6);
    backdrop-filter: blur(8px);
  }

  & > .close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;

    border: 1px solid rgba(199, 198, 198, .38);
    border-radius: 50%;
    background-color: rgba(18, 20, 26, .6);
    backdrop-filter: blur(12px);
    cursor: pointer;

    @include mixins.icon {
      fill: var(--color-fg);
    }

    &:hover {
      box-shadow: 0 0 20px -2px rgba(255, 255, 255, .25);
    }

    &:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 3px;
    }
  }

  & > .frame {
    // min-height: 0 lets it shrink inside the flex column,
    // so it scrolls instead of overflowing the dialog
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  & > .frame > .screen {
    margin: 0;
    background-color: rgba(0, 0, 0, .25);

    & > .image {
      display: block;
      margin: 0 auto;

      // Both dimensions auto under max-* limits keeps the
      // ratio, and never stretches the 808px Grimoire
      // cover past its own size
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 70vh;
      max-height: 70dvh;
    }
  }

  & > .frame > .thumbs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 28px 0;

    & > .thumb {
      width: 96px;
      aspect-ratio: 16 / 10;
      padding: 0;
      overflow: hidden;

      border: 1px solid rgba(199, 198, 198, .38);
      border-radius: 4px;
      background: none;
      cursor: pointer;

      &.-active { border-color: var(--color-accent); }

      & > .image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  & > .frame > .body {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 24px 20px 28px;

    @include mixins.min-width(635px) {
      padding: 28px 32px 32px;
    }
  }

  & > .frame > .body > .wrap > .title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 16px;

    & > .icn-wrap { display: flex; }

    & > .title {
      font-family: var(--brand-font);
      font-weight: 300;
      font-size: 26px;
      letter-spacing: .04em;
      text-transform: uppercase;
    }
  }

  & > .frame > .body > .wrap > .description {
    margin-top: 20px;
    max-width: 72ch;

    font-size: 16px;
    line-height: 1.6;
    color: rgba(var(--color-fg-rgb), .85);

    :deep(.link) { color: var(--color-accent); }
  }

  & > .frame > .body > .wrap > .links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    transition: none;

    &::backdrop { transition: none; }
  }
}

// Where an open dialog animates in from. Kept outside the
// block above so the compiled selector stays flat
@starting-style {
  .project-dialog[open] {
    opacity: 0;
    transform: scale(.98);
  }

  .project-dialog[open]::backdrop {
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0);
  }
}
</style>
