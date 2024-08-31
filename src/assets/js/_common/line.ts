const line = () => {
  const line = document.querySelector('.header-line') as HTMLElement;
  const header = document.querySelector('.site-header') as HTMLElement;
  const nav = document.querySelector('.header-nav') as HTMLElement;


  
  line.style.maxWidth = '0px';
  line.style.transitionBehavior = 'smooth';
  line.style.transition = '1s';
  line.style.transitionTimingFunction = 'ease';

  line.style.width = header.offsetWidth + 'px';

  line.style.width = header.offsetWidth + 'px';
  line.style.minWidth = header.offsetWidth + 'px';
  line.style.zIndex = '9999';
  line.style.position = 'absolute';
  line.style.left = '-' + header.offsetWidth + 'px';
  line.style.maxWidth = '-' + header.offsetWidth + 'px';
  line.style.transition = '1s';
  line.style.left = header.offsetWidth + 'px';
  line.style.transitionTimingFunction = 'ease';


  line.style.width = '3px';
  line.style.maxWidth = '3px';
  line.style.display = 'flex-inline';
  line.style.right =  header.offsetWidth + 'px';
  line.style.width = nav.clientWidth.toString();
  for(let length = header.offsetWidth; length < nav.clientWidth; length++) {
    line.style.width = length + 'px';
  }
};

export default line;