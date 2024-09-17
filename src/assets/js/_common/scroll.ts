

const scroll = () => {
  const navItem = document.querySelector('.header-nav__item')?.addEventListener('click', () => {

  const speed = 500;

  const siteMain = document.querySelector('.section-top__icon img') as HTMLElement;
  console.log(siteMain);
  siteMain.style.position = 'absolute';
  siteMain.style.transition = '1s';
  siteMain.style.transitionTimingFunction = 'ease';
  siteMain.style.left = '0px';  
  let mainLength = 0;
  if(siteMain !== null) {
    siteMain.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
    mainLength = siteMain.children.length;
 
//siteMainを右にスクロール
    for(let i = 0; i < mainLength; i++) {
      // siteMain.style.left = `${i * 10}px`; 
      siteMain.style.x = `${i}px`;
      
    }
  }
})};


export default scroll;