import type { Component } from 'vue'

import * as icons from '@assets/icons'


export type IconName = keyof typeof icons

function useIcon(
  icnName: IconName,
  fallback: IconName = 'Forbidden' as IconName
): Component | null {
  const icon = icons[icnName]

  if (!icon) {
    console.error(`Couldn't find icon "${icnName}"`)
    return icons[fallback] || null
  }

  return icon
}

export default useIcon
