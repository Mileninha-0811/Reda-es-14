// botão hambúrguer (mobile)
const btnHamburger = document.getElementById('btn-hamburger');
const nav = document.getElementById('main-nav');

if (btnHamburger && nav) {
  btnHamburger.addEventListener('click', () => {
    const isVisible = nav.style.display === 'flex';
    if (!isVisible) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      btnHamburger.setAttribute('aria-expanded', 'true');
    } else {
      nav.style.display = 'none';
      btnHamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // fecha menu se redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 600) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'row';
    } else {
      nav.style.display = 'none';
      btnHamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// abrir/fechar textos completos (cada card)
document.querySelectorAll('.btn-open').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const id = btn.dataset.id;
    const box = document.getElementById(id);
    if (!box) return;

    const alreadyOpen = box.style.display === 'block';

    // fecha todos os fulltext antes
    document.querySelectorAll('.fulltext').forEach(ft => {
      ft.style.display = 'none';
      ft.setAttribute('aria-hidden', 'true');
    });
    document.querySelectorAll('.btn-open').forEach(b => b.setAttribute('aria-expanded', 'false'));

    if (!alreadyOpen) {
      box.style.display = 'block';
      box.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      // rola até o card
      box.scrollIntoView({behavior: 'smooth', block: 'center'});
    } else {
      box.style.display = 'none';
      box.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});

// clique fora para fechar fulltexts (opcional, simples)
document.addEventListener('click', (e) => {
  // se clicou em botão abrir, ignora
  if (e.target.closest('.btn-open')) return;
  // se clicou dentro de um fulltext, ignora
  if (e.target.closest('.fulltext')) return;
  // fecha todos
  document.querySelectorAll('.fulltext').forEach(ft => {
    ft.style.display = 'none';
    ft.setAttribute('aria-hidden', 'true');
  });
  document.querySelectorAll('.btn-open').forEach(b => b.setAttribute('aria-expanded', 'false'));
});
/* ===== LÓGICA DO MODAL (cole no final do script.js) ===== */
(function(){
  const modal = document.getElementById('modal-redacao');
  const modalBody = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');

  if (!modal || !modalBody) return; // se faltar, aborta sem erro

  // abre modal: pega o conteúdo da div fulltext com o id passado
  function abrirModal(id) {
    const full = document.getElementById(id);
    if (!full) return;
    // opcional: pegar título (se existir h5 dentro)
    const tituloEl = full.querySelector('h5');
    modalTitle.textContent = tituloEl ? tituloEl.textContent : '';
    modalTitle.hidden = !tituloEl;
    // clona o conteúdo (para evitar remover do DOM original)
    modalBody.innerHTML = full.innerHTML;
    modal.setAttribute('aria-hidden', 'false');
    // trava o scroll do body
    document.body.style.overflow = 'hidden';
    // focar no botão fechar por acessibilidade
    modalClose?.focus();
  }

  function fecharModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalBody.innerHTML = '';
    modalTitle.textContent = '';
    document.body.style.overflow = '';
  }

  // conecta botões .btn-open que já existem no seu HTML
  document.querySelectorAll('.btn-open').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id; // espera r1, r2 ...
      if (!id) return;
      abrirModal(id);
    });
  });

  // fechar ao clicar no X
  modalClose && modalClose.addEventListener('click', fecharModal);

  // fechar clicando fora do painel
  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
  });

  // fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      fecharModal();
    }
  });
})();

const btn = document.getElementById('showChronicleBtn');
const chronicle = document.getElementById('chronicle');

btn.addEventListener('click', () => {
  if (chronicle.style.maxHeight === "0px" || chronicle.style.maxHeight === "") {
    chronicle.style.maxHeight = chronicle.scrollHeight + "px";
    chronicle.style.padding = "25px";
    btn.textContent = 'Esconder Crônica';
  } else {
    chronicle.style.maxHeight = "0px";
    chronicle.style.padding = "0 25px";
    btn.textContent = 'Mostrar Crônica';
  }
});