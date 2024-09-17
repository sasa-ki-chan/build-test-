

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

      // if(window.innerWidth < mobileBreakpoint) {
      //   $body.classList.remove('is-tablet');
      //   $body.classList.add('is-mobile');
      // }
    } else {
      $body.classList.remove('is-mobile');
      $header.classList.remove('is-mobile');
      $header.classList.remove('open');
      $headerNav.attributes.removeNamedItem('style');
    }
  })
  $headerButton?.addEventListener('click', () => {
    $headerNav?.classList.toggle('open');
    $headerNav.attributes.removeNamedItem('style');
  })
}



export default responsive;