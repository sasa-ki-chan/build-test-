import type { HtmlConfiguration } from "./config/html.d.ts";
import type { JsConfiguration } from "./config/js.d.ts";
import type { CssConfiguration } from "./config/css.d.ts";
import { ImgConfiguration } from "./config/img.js";

declare interface Configuration {

  /**
   * モードを指定します。
   * @description `"development"` 開発モードです。無指定の場合こちらが選択されます。
   * @description `"production"` 本番モードです。
   */
  mode?: "development" | "production";
  /**
   * ソースディレクトリの名称を指定します。
   * @default "src"
   */
    src?: string;

  /**
   * 出力ディレクトリの名称を指定します。
   * @default "dist"
   */
  dist?: string;

  /**
   * デバッグモードを有効にするかどうかを指定します。
   */
    debug?: boolean;

  /**
   * watchモードを有効にするかどうかを指定します。
   * @default false
   */
  watch?: boolean;

  /**
   * ログの深さを指定します。
   * @description `"none"` ログを出力しません。
   * @description `"minimum"` ログを最低限出力します。
   * @description `"default"` デフォルトのログを出力します。
   * @description `"debug"` `"detiled"` 詳細なログを出力します。
   */
  logDepth?: "none" | "minimum" | "default" | "debug" | "detailed";

  html?: HtmlConfiguration;

  js?: JsConfiguration;

  css?: CssConfiguration;

  img?: ImgConfiguration;
  
  /**
   * 出力ディレクトリにコピーしないディレクトリのプレフィクスを指定します。
   * @default ["_", "html"]
   */
  excludePrefix: string[];

  /**
   * watchモードのオプションを指定します。
   */
  watchOptions?: {
    open?: boolean,
    hot?: boolean,
    server?: {
      port?: number,
      index?: string
    }
  }
}

export default Configuration;
