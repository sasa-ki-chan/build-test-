export declare interface JsConfiguration {

  /**
   * 対象のファイルパターンを指定します。
   * @default ["**\/*", "!**\/*.d", "!**\/_*\/**\/*"]
   */
  patterns: string[],

    /**
   * 対象の拡張子を指定します。
   * @default [".js", ".ts", ".jsx", ".tsx"]
   */
  extensions: string[],

   /**
   * コンパイル後の拡張子を指定します。(事情がない限り変更しないこと)
   * @default ".js"
   */
  compiledExtension?: ".js"

  /**
   * sourcemap を有効にします。
   * `production`モードでは無効になります。
   * @param true
   */
  sourcemap?: boolean,

  /**
   * minify を有効にします。
   * `production`モードでは常に有効になります。
   */
  minify?: boolean

  /**
   * web 向けのバンドルを有効にします。無効にした場合、node 向けのバンドルが出力されます。
   * @param true
   */
  web?: boolean
}

