import { ref } from 'vue'

import { sectionIds, type SectionId } from '@/sections'

// Which section the page is currently showing. Written by
// the transition driver in useSectionTransitions - the
// stages overlap, so an IntersectionObserver would see two
// of them straddle the middle of the viewport during a
// cross-fade and flip-flop between them.
//
// Read by NavMenu (active highlight) and ScrollIndicator
// (section label).
export const activeSection = ref<SectionId>(sectionIds[0])
