const showModal = () => {
  const modal = document.querySelector('.modal') as HTMLElement;
  const modalBg = document.querySelector('.modal__bg') as HTMLElement;
  const modalContent = document.querySelector('.modal__content') as HTMLElement;
  const modalImg = document.querySelector('.modal__content img') as HTMLImageElement;
  console.log(modal);
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    //targetにdata-idがある場合
    if (target.dataset.id) {
      modal.classList.toggle('open');
      document.body.classList.add('is-fixed');
      //targetにimgを追加
      modalImg.src = target.getAttribute('src') as string;
    }
    if(target === modalBg || target.classList.contains('modal__close')) {
      modal.classList.remove('open');
      document.body.classList.remove('is-fixed');
    }

  });
}

export default showModal;