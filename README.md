# よくわらないがうごく(仮)

## 機能面について

  1. ビルドツールはesbuildなどを記述に独自で編集します。
  2. 不具合があったら佐々木にメンションください

##　開発環境

  1. Node.js v14.17.0
  2. npm v6.14.13
  3. yarn v1.22.10

## ビルド方法
  
  1. `yarn install`
  2. `yarn build`

# ディレクトリ構成

  1. devフォルダには開発が必要な諸々が入っている。
    pugコンパイル時に必要になるデータはdev/data/  に格納されています
  2. コンパイル・トランスパイルが行われたのちのディレクトリは"src"、ビルド後　は"dist"に格納されています。