export declare interface HtmlConfiguration {
  /**
   * 対象のファイルパターンを指定します。
   * @default ["**\/*", "!**\/_*\/*", "!**\/html/**\/*", "!**\/data/**"]
   */
  patterns: string[];
  
  /**
   * 対象の拡張子を指定します。
   * @default [".html", ".pug", ".jade"]
   */
  extensions: string[];

  /**
   * コンパイル後の拡張子を指定します。
   * @default ".html"
   */
  compiledExtension?: string;
}