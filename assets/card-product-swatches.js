function colorSwatches() {
  document.querySelectorAll('div.color-swatch__label').forEach(swatch => {
    swatch.addEventListener('click', function() {
      this.parentElement.querySelectorAll('.color-swatch__label').forEach(item =>{
        item.classList.remove('active')
      })
      this.classList.add('active');
      let cardLink = this.closest('.card__content').querySelector('.card__heading a')
      cardLink.href = this.dataset.url;
    }) 
  })
}

document.addEventListener('DOMContentLoaded', function() {
  colorSwatches();
})