document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os itens do FAQ
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      // Fecha outros itens que possam estar abertos
      faqItems.forEach(innerItem => {
        if (innerItem !== item) {
          innerItem.classList.remove('open');
        }
      });

      // Alterna a classe 'open' no item clicado
      item.classList.toggle('open');
    });
  });
});