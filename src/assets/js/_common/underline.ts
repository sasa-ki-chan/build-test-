//新しいタグを作る
const setUnderLine = () => {
  const tabletBreakpoint = 1024;
  const getUnderline = () => {
    const nav = document.getElementsByClassName('header-nav') as HTMLCollectionOf<HTMLElement>;
    const underline = document.createElement('div');
    underline.classList.add('header-underline');
    let maxWidth = 0;
    for(let i = 0; i < nav.length; i++) {
      if(nav[i].offsetWidth > maxWidth) {
        maxWidth = nav[i].offsetWidth;
      }
    }
    underline.style.width = maxWidth + 'px';
    underline.style.minWidth = maxWidth + 'px';
    underline.style.zIndex = '9999';
    underline.style.transition = '1s';
    underline.style.transitionTimingFunction = 'ease';
    underline.style.position = 'absolute';
    return underline;
  }

  document.querySelector('.header-nav')?.appendChild(getUnderline());
  if(window.innerWidth < tabletBreakpoint) {
    document.querySelector('.header-underline')?.remove();
  }

} 
  export default setUnderLine;