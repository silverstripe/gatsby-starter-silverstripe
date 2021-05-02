export interface Navigable {
  id: string
  link: string
}

export interface Menuable extends Navigable {
  menuTitle: string
}

export interface Hierarchical extends Menuable {
  parentNode: Hierarchical
  childNodes: Array<Hierarchical>
}
