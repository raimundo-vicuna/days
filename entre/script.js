document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-config');
  const closeBtn = document.getElementById('close-config');
  const applyBtn = document.getElementById('apply-config');
  const viewArea = document.getElementById('view-area');
  const configArea = document.getElementById('config-area');
  const dateFrom = document.getElementById('date-from');
  const dateTo = document.getElementById('date-to');
  const elapsed = document.getElementById('elapsed');
  const remaining = document.getElementById('remaining');
  const total = document.getElementById('total');
  const formatSelect = document.getElementById('format-select');

  function toggleConfig(show) {
    if (show) {
      viewArea.classList.add('hidden');
      configArea.classList.remove('hidden');
      configArea.setAttribute('aria-hidden', 'false');
    } else {
      viewArea.classList.remove('hidden');
      configArea.classList.add('hidden');
      configArea.setAttribute('aria-hidden', 'true');
    }
  }

  openBtn.addEventListener('click', () => toggleConfig(true));
  closeBtn.addEventListener('click', () => toggleConfig(false));

  function calc() {
    const a = dateFrom.value ? new Date(dateFrom.value) : null;
    const b = dateTo.value ? new Date(dateTo.value) : null;

    if (!a || !b) {
      elapsed.textContent = '—';
      remaining.textContent = '—';
      if (total) total.textContent = '—';
      return;
    }

    a.setHours(0, 0, 0, 0);
    b.setHours(0, 0, 0, 0);

    const diff = Math.round((b - a) / (1000 * 60 * 60 * 24));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let elapsedDays = Math.round((Math.min(today, b) - a) / (1000 * 60 * 60 * 24));
    if (isNaN(elapsedDays)) elapsedDays = 0;
    if (elapsedDays < 0) elapsedDays = 0;

    let remainingDays = diff - elapsedDays;
    if (isNaN(remainingDays)) remainingDays = 0;

    let totalDays = diff;
    if (totalDays < 0) totalDays = 0;

    if (formatSelect.value === 'verbose') {
      elapsed.textContent = `${elapsedDays} ${elapsedDays === 1 ? 'day' : 'days'}`;
      remaining.textContent = `${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`;
      if (total) total.textContent = `${totalDays} ${totalDays === 1 ? 'total day' : 'total days'}`;
    } else {
      elapsed.textContent = String(elapsedDays);
      remaining.textContent = String(remainingDays);
      if (total) total.textContent = String(totalDays);
    }
  }

  dateFrom.addEventListener('change', calc);
  dateTo.addEventListener('change', calc);
  formatSelect.addEventListener('change', calc);

  applyBtn.addEventListener('click', () => {
    toggleConfig(false);
    calc();
  });

  if (!dateFrom.value && !dateTo.value) {
    const today = new Date();
    const prior = new Date(today);
    prior.setDate(today.getDate() - 7);
    dateFrom.value = prior.toISOString().slice(0, 10);
    dateTo.value = today.toISOString().slice(0, 10);
    calc();
  } else {
    calc();
  };
  flatpickr("#date-from", {
  dateFormat: "Y-m-d",
  allowInput: true
});

flatpickr("#date-to", {
  dateFormat: "Y-m-d",
  allowInput: true
});

});
