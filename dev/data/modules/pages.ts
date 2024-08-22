

export const pages = [
  { id:'top', name: 'ホーム',      en: 'home',    url: '' },
  { id: 'oekaki',name: 'おえかき',     en: 'illust', url: 'oekaki' },
  { id:'ongaku', name:  '音楽',        en: 'music',   url: 'ongaku' },
  { id: 'contact',name: 'お問い合わせ', en:'contact',  url: 'contact' }
];

export const initUrl = (currentPage: string) => {
  if(currentPage === 'top'){
    console.log('top');
    return './';
  }
  else {
    console.log('other');
    return '../';
  }
}