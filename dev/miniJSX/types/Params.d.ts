export interface Params {
  tagName: keyof HTMLElementTagNameMap, 
  props?: {
  [key: string]: string | number | object,
  }, 
  ...children: any
}

export type ForParams = {
  [key: 'num']: number | { [key: string]: string | number | Function | Params }
}
