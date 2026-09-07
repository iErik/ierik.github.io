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

// How far through the active section we are, 0..1. Also
// written by the driver: it already knows where each stage
// starts and stops, and re-deriving that here would be a
// second copy of the same geometry.
//
// Read by ScrollIndicator to fill the active segment.
export const sectionProgress = ref(0)
