/* shapes.js — CSS 3D shape animations & toggle logic */

export function initShapes() {
  /* ── Tab switching ──────────────────────────── */
  const tabs   = document.querySelectorAll('.shape-tab');
  const panels = document.querySelectorAll('.shape-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('panel-' + tab.dataset.shape);
      if (target) target.classList.add('active');
    });
  });

  /* ── Cube spin toggle ───────────────────────── */
  const cube    = document.querySelector('.cube-3d');
  const cubeBtn = document.getElementById('cube-toggle');
  if (cube && cubeBtn) {
    cubeBtn.addEventListener('click', () => {
      cube.classList.toggle('paused');
      cubeBtn.textContent = cube.classList.contains('paused')
        ? '▶ 회전 시작' : '⏸ 회전 멈추기';
    });
  }

  /* ── Cylinder unfold/fold ───────────────────── */
  const cylBtn   = document.getElementById('cyl-toggle');
  const cylWrap  = document.querySelector('.cyl-anim-wrap');
  if (cylBtn && cylWrap) {
    let unfolded = false;
    cylBtn.addEventListener('click', () => {
      unfolded = !unfolded;
      if (unfolded) {
        cylWrap.classList.add('unfolded');
        cylBtn.textContent = '🔄 접기 (원기둥)';
      } else {
        cylWrap.classList.remove('unfolded');
        cylBtn.textContent = '📄 펼치기 (전개도)';
      }
    });
  }

  /* ── Pyramid float toggle ───────────────────── */
  const pyrBtn  = document.getElementById('pyr-toggle');
  const pyrWrap = document.querySelector('.pyramid-wrap');
  if (pyrBtn && pyrWrap) {
    let animated = true;
    pyrBtn.addEventListener('click', () => {
      animated = !animated;
      pyrWrap.style.animation = animated
        ? 'floatShape 5s ease-in-out infinite' : 'none';
      pyrBtn.textContent = animated ? '⏸ 멈추기' : '▶ 움직이기';
    });
  }
}
