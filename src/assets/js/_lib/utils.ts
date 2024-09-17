declare interface $ {
  $ (selector: string): HTMLElement;
  $$ (selector: string): NodeListOf<HTMLElement>; 
  $children (parent: HTMLElement): HTMLCollectionOf<HTMLElement>;
}
/**
 * @description JQuery like selector
 * @param selector 
 * @returns 
 */
export const $ = (selector: string) => {
  const query = document.querySelector(selector);
  if(query){
    return query as HTMLElement;
  }
  else {
    throw new Error(`"${selector}" is not found.`);
  }
}

/**
 * @description JQuery like selector but returns NodeList
 * @param selector 
 * @returns 
 */
export const $$ = (selector: string) => {
  const query = document.querySelectorAll(selector);
  if(query){
    return query;
  }
  else {
    throw new Error(`"${selector}" is not found.`);
  }
}

/**
 * @description JQuery like selector but returns childrenNodes
 * @param selector 
 * @returns 
 */
export const $children = (parent: HTMLElement) => {
  return parent.children;
}