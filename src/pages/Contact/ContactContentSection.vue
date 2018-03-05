<script lang="coffee">
import siteConfig from 'config/config'
import { find } from 'underscore'

import FloatingButton from 'components/FloatingButton'

export default ContactContentSection =
  name: 'contact-content-section'
  data: ->
    emailAddress: find(siteConfig.contactLinks, { name: 'email' }).profile || ''
  components:
    FloatingButton: FloatingButton

</script>

<template lang="html">
  <div class="section-content bg-standard">
    <div class="content">

      <div class="contact-info l-flex-column align-center">
        <span>Ericsson Isidoro</span>
        <span>São Paulo, SP</span>
        <span>
          E-mail:
          <a class="email-link" :href="'mailto:' + emailAddress">
            {{ emailAddress }}
          </a>
        </span>
        <span>Cel: +55 (11) 98012-3799</span>
        <span>Tel: +55 (11) 2961-4664</span>
      </div>

    </div>
  </div>
</template>

<style lang="sass">
@import ~styles/helpers/_module

$section-foreground-color: foreground-color()

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
    align-items: center
    justify-content: center

    height: 100%
    padding: 50px 5.856515373%

  .contact-info
    font-size: 0.95rem

    +media-breakpoint-down(small)
      font-size: 1.16rem

    > span
      font-weight: 400
      letter-spacing: 0.2px

      margin-bottom: 6px

      -webkit-font-smoothing: antialiased
      -moz-osx-font-smoothing: grayscale

</style>
