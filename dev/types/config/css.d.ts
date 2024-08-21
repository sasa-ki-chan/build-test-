export declare interface CssConfiguration {
    /**
   * 対象のファイルパターンを指定します。
   * @default ["**\/*", "!**\/_*\/*", "!**\/html/**\/*", "!**\/data/**"]
   */
    patterns: string[];
  
    /**
     * 対象の拡張子を指定します。
     * @default [".css", ".scss", ".sass"]
     */
    extensions: string[];

    /**
     * コンパイル後の拡張子を指定します。
     * @default ".css"
     */
    compiledExtension: string;

    /**
     * sourcemap を有効にします。
     * `production`モードでは無効になります。
     * @param true
     */
    sourcemap?:boolean;
  }