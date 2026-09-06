// The single-scroll page is three sections; the router
// paths exist only to name a landing spot within it, so
// route names and section ids map 1:1

export const SECTIONS = {
  Homepage: 'homepage',
  Portfolio: 'portfolio',
  About: 'about'
} as const

export type RouteName = keyof typeof SECTIONS
export type SectionId = typeof SECTIONS[RouteName]

export const sectionIds =
  Object.values(SECTIONS) as SectionId[]

export const routeNames =
  Object.keys(SECTIONS) as RouteName[]

export const sectionOf = (name: RouteName) =>
  SECTIONS[name]

export const routeNameOf = (sectionId: string) =>
  routeNames.find(name => SECTIONS[name] === sectionId)
