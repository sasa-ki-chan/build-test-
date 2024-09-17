export declare namespace JSX {
  export interface ElementBasicParams  {
    [name: string]:  HTMLElement | ElementBasicParams
  
    /**
     * クラス名を指定します。
     */
    class?: string

    /**
     * IDを指定します。
     */
    id?: string
  }

  type href = {
    /**
     * リンク先を指定します。
     */
    href: string
  }

  type src = {
    /**
     * ファイルのパスを指定します。
     */
    src: string
  }

  type alt = {
    /**
     * 画像の説明を指定します。
     */
    alt: string
  }
  type Element = HTMLElement
  interface IntrinsicElements {
    /**
     * @description 一般的なHTML要素を指定します。
     */
    [name: string]: keyof HTMLElementTagNameMap

    /**
     * @description for文の構文を定義します。
     * @param each 数値、もしくはオブジェクト、配列を指定します。数値を除き格納されている値の数だけ繰り返します。
     * @returns HTMLElement
     * @example
     * ```tsx
     * <For each={5}> // 5回繰り返す
     *  <div>hello</div>
     * </For>
     * ```
     */
    For(params: {each: number | object | Array}): HTMLElement
    
  }
}

