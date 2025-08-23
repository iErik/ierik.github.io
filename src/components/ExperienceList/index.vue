<template>
  <section class="experiences">
    <article
      v-for="experience in experiences"
      :key="`${experience.start}-${experience.end}`"
      class="experience"
    >
      <div class="head">
        <div class="title-wrap">
          <p class="title">{{ experience.title }}</p>
          <span class="start-end">
            {{ experience.start }} → {{ experience.end}}
          </span>
        </div>
        <p class="company">{{ experience.company }}</p>
      </div>
      <ul class="items">
        <li
          v-for="item in experience.items"
          :key="item"
          class="item"
        >
          <p class="text">{{ item }}</p>
        </li>
      </ul>
    </article>
  </section>
</template>

<script lang="ts" setup>

type ExperienceType = {
  title: string
  company: string
  start: string
  end: string
  items: string[]
}

const props = defineProps<{
  experiences: ExperienceType[]
}>()
</script>

<style lang="scss" scoped>
@use '@styles/utils/theming';
@use '@styles/utils/mixins';

.experiences {
  @include theming.frame;
  background: linear-gradient(
    94.68deg,
    rgba(250, 250, 250, 0.05) 9.22%,
    rgba(255, 255, 255, 0.02) 90.35%);

  border-radius: 8px;

  max-width: 735px;

  & > .experience {
    padding: 20px;

    @include mixins.min-width(635px) { padding: 32px 38px; }

    &:not(:last-child) {
      border-bottom: 1px solid rgba(199, 198, 198, .39);
    }

    & > .head {
      margin-bottom: 10px;

      & > .title-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        @include mixins.min-width(635px) {
          align-items: center;
          flex-direction: row;
          gap: 8px;
        }
      }

      & > .title-wrap > .title {
        font-weight: 400;
        font-size: 15px;
        text-transform: uppercase;

        @include mixins.min-width(635px) { }
      }

      & > .title-wrap > .start-end {
        font-weight: 600;
        font-size: 13px;

        @include mixins.min-width(635px) {
          font-size: 15px;
        }
      }

      & > .company {
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;

        @include mixins.min-width(635px) {
          font-size: 14px;
        }
      }
    }

    & > .items {
      padding-left: 25px;

      @include mixins.min-width(635px) {
        padding-left: 40px;
      }

      & > .item { }

      & > .item > .text {
        font-weight: 500;
        font-size: 14px;
        color: rgba(var(--color-fg-rgb), .7);
      }
    }
  }
}
</style>
