export declare interface Configuration {
  /**
   * ソースディレクトリの名称を指定します。
   * @default "src"
   */
  src: string;

  /**
   * 出力ディレクトリの名称を指定します。
   * @default "dist"
   */
  dist: string;

  /**
   * watchモードを有効にするかどうかを指定します。
   * @default false
   */
  watch: boolean;

  /**
   * ログの深さを指定します。
   * @description `"none"` ログを出力しません。
   * @description `"minimum"` ログを最低限出力します。
   * @description `"default"` デフォルトのログを出力します。
   * @description `"debug"` 詳細なログを出力します。
   */
  logDepth: "none" | "minimum" | "default" | "debug";

  // html: HtmlConfiguration;

  // js: JsConfiguration;

  // css: CssConfiguration;

  // img: ImgConfiguration;
  /**
   * 出力ディレクトリにコピーしないディレクトリのプレフィクスを指定します。
   * @default ["_", "html"]
   */
  excludePrefix: string[];
}

