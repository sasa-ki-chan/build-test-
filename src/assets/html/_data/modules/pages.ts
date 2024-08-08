import type { Pages } from './types.d.ts';

export const pages: Pages = [
  { name: 'ホーム',      en: 'home',    url: '' },
  { name: 'おえかき',     en: 'illust', url: 'oekaki' },
  { name: '音楽',        en: 'music',   url: 'ongaku' },
  { name: 'お問い合わせ', en:'contact',  url: 'contact' }
];

export const initPages = (pages: Pages, pageDir: string) => {
  pages.map((page) => {
    page.url = pageDir + page.url.replace('./', '');
  });
}

//変数名を取得するには
