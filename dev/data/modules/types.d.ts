/**
 * @file types.d.ts
 * @description pugファイルで使用するデータの型を定義します。
 */


/** 
 *  イラストをオブジェクト形式で定義します。
 *  制作年をキーとして、その制作年のイラストを配列で定義します。
 */
export declare type Illusts = {

  [year: string]: {

    /** イラストのタイトル。*/
    title?: string,

    /** イラストの画像のファイル名。*/
    src: string,

    /** イラストのalt属性。*/
    alt?: string,

    /** イラストの説明。*/
    text?: string

  }[]

};


/** ページの情報を配列で定義します。*/
export declare type Pages = {

  /** 日本語のページ名。*/
  name: string,

  /** 英語のページ名。*/
  en: string,

  /** ページのURL。*/
  url: string

}[];

/** ページの情報をオブジェクト形式で定義します。*/
export declare type Meta = {
  
  /** ページのタイトル。*/
  title: string,

  /** ページの説明。*/
  description: string,

  /** ページのキーワード。*/
  keywords: string,

  /** 初期化関数。 */
  init: (options: Partial<Meta>) => void

};