/* euler.js — Interactive Euler formula calculator */

export function initEuler() {
  const slider      = document.getElementById('n-slider');
  const nDisplay    = document.getElementById('n-display');
  const shapeToggles = document.querySelectorAll('.shape-toggle-btn');
  const faceEl      = document.getElementById('res-f');
  const vertEl      = document.getElementById('res-v');
  const edgeEl      = document.getElementById('res-e');
  const verifyEl    = document.getElementById('euler-verify');

  if (!slider) return;

  let shapeType = 'prism'; // 'prism' | 'pyramid' | 'cylinder'

  function compute(n, type) {
    switch (type) {
      case 'prism':
        return { f: n + 2, v: 2 * n, e: 3 * n };
      case 'pyramid':
        return { f: n + 1, v: n + 1, e: 2 * n };
      case 'cylinder':
        return { f: 3, v: 0, e: 2 };
      default:
        return { f: 0, v: 0, e: 0 };
    }
  }

  function update() {
    const n = parseInt(slider.value, 10);
    nDisplay.textContent = n;
    const { f, v, e } = compute(n, shapeType);
    faceEl.textContent = f;
    vertEl.textContent = v;
    edgeEl.textContent = e;

    if (shapeType !== 'cylinder') {
      const euler = v - e + f;
      verifyEl.className = 'euler-verify ok';
      verifyEl.innerHTML = `V − E + F = ${v} − ${e} + ${f} = <strong>${euler}</strong> ✓`;
    } else {
      verifyEl.className = 'euler-verify info';
      verifyEl.innerHTML = `원기둥은 곡면이 있어 오일러 공식이 직접 적용되지 않아요.`;
    }
  }

  shapeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      shapeToggles.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      shapeType = btn.dataset.shape;
      // disable slider for cylinder
      slider.disabled = shapeType === 'cylinder';
      update();
    });
  });

  slider.addEventListener('input', update);
  update(); // init
}
