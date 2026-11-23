/* stepper.js — DIY 5-step guide logic */

export function initStepper() {
  const steps   = document.querySelectorAll('.step-btn');
  const panels  = document.querySelectorAll('.step-panel');
  const prevBtn = document.getElementById('step-prev');
  const nextBtn = document.getElementById('step-next');
  let current   = 0;

  function goTo(idx) {
    if (idx < 0 || idx >= steps.length) return;
    // mark done for all previous
    steps.forEach((s, i) => {
      s.classList.toggle('active', i === idx);
      s.classList.toggle('done',   i < idx);
    });
    panels.forEach((p, i) => p.classList.toggle('active', i === idx));
    current = idx;
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.textContent = idx === steps.length - 1 ? '✅ 완료!' : '다음 단계 →';
    if (nextBtn) nextBtn.disabled = false;
  }

  steps.forEach((btn, i) => {
    btn.addEventListener('click', () => goTo(i));
  });

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (current < steps.length - 1) goTo(current + 1);
      else {
        nextBtn.textContent = '🎉 팝업북 완성!';
        nextBtn.style.background = 'var(--grad-accent)';
        nextBtn.style.color = '#fff';
        setTimeout(() => {
          goTo(0);
          nextBtn.textContent = '다음 단계 →';
          nextBtn.style.background = '';
          nextBtn.style.color = '';
        }, 2000);
      }
    });
  }

  goTo(0); // init
}
