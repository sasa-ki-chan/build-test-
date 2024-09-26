

const responsive = () => {
  const mobileBreakpoint = 768;
  const tabletBreakpoint = 1024;
  const $body = document.body as HTMLElement;
  const $header = document.querySelector('.site-header') as HTMLElement;
  const $headerNav = document.querySelector('.header-nav') as HTMLElement;
  const $headerLine = document.querySelector('.header-line') as HTMLElement;
  const $headerButton = document.querySelector('.header-nav__button') as HTMLElement;
  
  if(window.innerWidth < tabletBreakpoint) {
    $body.classList.add('is-mobile');
    $header.classList.add('is-mobile');
    $headerNav.style.transition = 'none';
    $headerLine.style.display = 'none';
  } else {
    $body.classList.remove('is-mobile');
    $header?.classList.remove('is-mobile');
  }
  addEventListener('resize', () => {
    if(window.innerWidth < tabletBreakpoint) {
      $body.classList.add('is-mobile');
      $header.classList.add('is-mobile');
      $headerNav.style.transition = 'none';
      $headerLine.style.display = 'none';
    } else {
      $body.classList.remove('is-mobile');
      $header.classList.remove('is-mobile');
      $header.classList.remove('open');
      $headerNav.attributes.removeNamedItem('style');
    }
  })
  $headerButton.addEventListener('click', () => {
    $headerNav.classList.toggle('open');
    $headerNav.attributes.removeNamedItem('style');
  })
  //header-nav以外をクリックしたらメニューを閉じる
  document.addEventListener('click', (e) => {
    if(!e.target) return;
    const target = e.target as HTMLElement;
    if(target.closest('.header-nav') || target.closest('.header-nav__button')) return;
    $headerNav.classList.remove('open');
  })
}

export default responsive;