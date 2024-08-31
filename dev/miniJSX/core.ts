
/// <reffetence path="./types/JSX.d.ts" />

/**
 * @description miniJSX関数は、JSXのような構文を使ってHTML要素を生成します。
 * @sample 
 * ```tsx
 * const element =
 *  <div>
 *   <p>hello</p>
 *  </div>
 * 
 * document.body.appendChild(element)
 * ``` 
 * 
 */
export function miniJSX(
  tagName: keyof HTMLElementTagNameMap, 
  props?: {
  [key: string]: string | number | object,
  }, 
  ...children: any)
{
  let $element: HTMLElement | null = null;
  if (props !== undefined) {
    $element = document.createElement(tagName);
    for (const key in props) {
      if (typeof key === 'string' && props !== undefined) {
        const value = props[key];
        if (typeof value === 'string' && $element !== null) {
          $element.setAttribute(key, value);
        }
      }
    }
    if(children !== undefined) {
      if(Array.isArray(children)) {
        for (const child of children) {
          if ($element instanceof HTMLElement) {
            if(child instanceof HTMLElement) {
              $element.appendChild(child as HTMLElement);
            }
            else if(typeof child === 'string') {
              $element.innerText = child;
            }
          }
        }
      }
      else {
        if ($element instanceof HTMLElement) {
          if(children  instanceof HTMLElement) {
            $element.appendChild(children as HTMLElement);
          }
          else if(typeof children === 'string') {
            $element.innerText = children;
          }
        }
      }
    } 
  }

  return $element;
}

// miniJSX("div", { class: "testing" }, miniJSX("div", { class: "test" }), miniJSX("h1", null, "Test")), f = () => { document.body.appendChild(x()) }

