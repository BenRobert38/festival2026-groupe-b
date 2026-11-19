/* =========================================================
   MIOUUUSIC EJJN — Script commun
   ========================================================= */

/* --- Menu burger (mobile) --- */
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-principale');
if (burger && nav) {
  burger.addEventListener('click', () => {
    const ouvert = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!ouvert));
    nav.classList.toggle('ouvert');
  });
}

/* --- Apparition des éléments au scroll --- */
const elements = document.querySelectorAll('.apparait');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entrees) => {
    entrees.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  elements.forEach((el) => obs.observe(el));
} else {
  elements.forEach((el) => el.classList.add('visible'));
}

/* --- Compte à rebours (page d'accueil) --- */
const rebours = document.querySelector('[data-rebours]');
if (rebours) {
  const cible = new Date(rebours.dataset.rebours).getTime();
  const champs = {
    j: rebours.querySelector('[data-j]'),
    h: rebours.querySelector('[data-h]'),
    m: rebours.querySelector('[data-m]'),
    s: rebours.querySelector('[data-s]'),
  };
  const deux = (n) => String(n).padStart(2, '0');
  const maj = () => {
    let reste = Math.max(0, cible - Date.now());
    const j = Math.floor(reste / 86400000); reste %= 86400000;
    const h = Math.floor(reste / 3600000);  reste %= 3600000;
    const m = Math.floor(reste / 60000);    reste %= 60000;
    const s = Math.floor(reste / 1000);
    champs.j.textContent = j;
    champs.h.textContent = deux(h);
    champs.m.textContent = deux(m);
    champs.s.textContent = deux(s);
  };
  maj();
  setInterval(maj, 1000);
}

/* --- Onglets des jours (page programme) --- */
const onglets = document.querySelectorAll('.onglet');
const jours = document.querySelectorAll('.jour');
onglets.forEach((onglet) => {
  onglet.addEventListener('click', () => {
    onglets.forEach((o) => { o.classList.remove('actif'); o.setAttribute('aria-selected', 'false'); });
    jours.forEach((j) => j.classList.remove('actif'));
    onglet.classList.add('actif');
    onglet.setAttribute('aria-selected', 'true');
    document.getElementById(onglet.dataset.jour).classList.add('actif');
  });
});

/* --- Filtre par scène (page programme) --- */
const filtres = document.querySelectorAll('.filtre');
filtres.forEach((f) => {
  f.addEventListener('click', () => {
    filtres.forEach((x) => x.classList.remove('actif'));
    f.classList.add('actif');
    const scene = f.dataset.scene;
    document.querySelectorAll('.creneau').forEach((c) => {
      c.classList.toggle('cache', scene !== 'toutes' && c.dataset.scene !== scene);
    });
  });
});

/* --- Année dans le pied de page --- */
document.querySelectorAll('[data-annee]').forEach((el) => { el.textContent = new Date().getFullYear(); });
