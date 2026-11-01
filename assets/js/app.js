/*!
 * Nexus Admin - shared behaviour for every page.
 * Sections: 1 Sidebar | 2 Theme toggle | 3 Date + year | 4 Users page | 5 Products page | 6 Settings page
 * Each page-specific block only runs when its elements exist, so this one file is safe on all pages.
 */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);

  /* ---------- 1. Mobile sidebar ---------- */
  const sidebar = $('sidebar');
  const overlay = $('overlay');
  function toggleSidebar(open) {
    sidebar.classList.toggle('-translate-x-full', !open);
    overlay.classList.toggle('hidden', !open);
  }
  $('menu-btn')?.addEventListener('click', () => toggleSidebar(true));
  $('close-btn')?.addEventListener('click', () => toggleSidebar(false));
  overlay?.addEventListener('click', () => toggleSidebar(false));

  /* ---------- 2. Light / Dark toggle (choice is remembered) ---------- */
  $('theme-btn')?.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
  });

  /* ---------- 3. Today's date + footer year ---------- */
  if ($('today')) $('today').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  if ($('year')) $('year').textContent = new Date().getFullYear();

  /* Shared button styles for tabs / filter chips */
  const ON = 'bg-indigo-500 text-white shadow'.split(' ');
  const OFF = 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'.split(' ');
  function setActive(btn, on) {
    btn.classList.remove(...(on ? OFF : ON));
    btn.classList.add(...(on ? ON : OFF));
    btn.setAttribute('aria-pressed', String(on));
  }

  /* ---------- 4. Users page ---------- */
  if ($('users-body')) {
    const ROLE = {
      Admin: 'bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:text-violet-300',
      Editor: 'bg-cyan-500/10 text-cyan-700 ring-cyan-500/20 dark:text-cyan-300',
      Viewer: 'bg-slate-500/10 text-slate-700 ring-slate-500/20 dark:text-slate-300',
    };
    const STATUS = {
      Active: ['bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-400', 'bg-emerald-500'],
      Suspended: ['bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-400', 'bg-rose-500'],
      Inactive: ['bg-slate-500/10 text-slate-600 ring-slate-500/20 dark:text-slate-400', 'bg-slate-400'],
    };
    const GRADS = ['from-indigo-500 to-violet-500', 'from-emerald-500 to-cyan-500', 'from-rose-500 to-orange-400', 'from-amber-500 to-rose-500', 'from-violet-500 to-fuchsia-500', 'from-cyan-500 to-indigo-500'];
    const EDIT_ICON = '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
    const TRASH_ICON = '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>';

    // Demo data - replace with your API response
    let users = [
      { id: 1, name: 'Olivia Martin', email: 'olivia@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jackson Lee', email: 'jackson@example.com', role: 'Editor', status: 'Active' },
      { id: 3, name: 'Isabella Nguyen', email: 'isabella@example.com', role: 'Viewer', status: 'Inactive' },
      { id: 4, name: 'William Kim', email: 'will@example.com', role: 'Editor', status: 'Suspended' },
      { id: 5, name: 'Sofia Davis', email: 'sofia@example.com', role: 'Viewer', status: 'Active' },
      { id: 6, name: 'Liam Carter', email: 'liam@example.com', role: 'Viewer', status: 'Inactive' },
      { id: 7, name: 'Emma Wilson', email: 'emma@example.com', role: 'Admin', status: 'Active' },
      { id: 8, name: 'Noah Brown', email: 'noah@example.com', role: 'Editor', status: 'Active' },
      { id: 9, name: 'Ava Johnson', email: 'ava@example.com', role: 'Viewer', status: 'Suspended' },
      { id: 10, name: 'Mason Clark', email: 'mason@example.com', role: 'Viewer', status: 'Active' },
    ];
    let nextId = 11;
    const body = $('users-body');
    const modal = $('user-modal');
    const esc = (t) => t.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const initials = (n) => n.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

    function render() {
      const role = $('role-filter').value, status = $('status-filter').value;
      const q = $('user-search').value.trim().toLowerCase();
      const list = users.filter((u) => (role === 'All' || u.role === role) && (status === 'All' || u.status === status) && (u.name + u.email).toLowerCase().includes(q));
      body.innerHTML = list.map((u) => `
        <tr class="transition-colors duration-300 hover:bg-slate-50 dark:hover:bg-white/5">
          <td class="px-5 py-4"><div class="flex items-center gap-3">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br ${GRADS[u.id % GRADS.length]} text-xs font-bold text-white">${esc(initials(u.name))}</span>
            <div><p class="font-medium text-slate-900 dark:text-white">${esc(u.name)}</p><p class="text-xs text-slate-500">${esc(u.email)}</p></div></div></td>
          <td class="px-5 py-4"><span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${ROLE[u.role]}">${u.role}</span></td>
          <td class="px-5 py-4"><span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${STATUS[u.status][0]}"><span class="h-1.5 w-1.5 rounded-full ${STATUS[u.status][1]}"></span>${u.status}</span></td>
          <td class="px-5 py-4"><div class="flex justify-end gap-1">
            <button type="button" data-edit="${u.id}" class="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-all duration-300 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400" aria-label="Edit ${esc(u.name)}">${EDIT_ICON}</button>
            <button type="button" data-del="${u.id}" class="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-all duration-300 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400" aria-label="Delete ${esc(u.name)}">${TRASH_ICON}</button>
          </div></td></tr>`).join('');
      $('users-empty').classList.toggle('hidden', list.length > 0);
      $('users-count').textContent = `Showing ${list.length} of ${users.length} users`;
      $('stat-total').textContent = users.length;
      ['Active', 'Suspended', 'Inactive'].forEach((s) => { $('stat-' + s.toLowerCase()).textContent = users.filter((u) => u.status === s).length; });
    }

    function openModal(user) {
      $('modal-title').textContent = user ? 'Edit User' : 'Add New User';
      $('modal-submit').textContent = user ? 'Save changes' : 'Add user';
      $('u-id').value = user ? user.id : '';
      $('u-name').value = user ? user.name : '';
      $('u-email').value = user ? user.email : '';
      $('u-role').value = user ? user.role : 'Viewer';
      $('u-status').value = user ? user.status : 'Active';
      modal.classList.remove('hidden'); modal.classList.add('flex');
      $('u-name').focus();
    }
    function closeModal() { modal.classList.add('hidden'); modal.classList.remove('flex'); }

    body.addEventListener('click', (e) => {
      const edit = e.target.closest('[data-edit]'), del = e.target.closest('[data-del]');
      if (edit) openModal(users.find((u) => u.id === +edit.dataset.edit));
      if (del && confirm('Delete this user? This cannot be undone.')) { users = users.filter((u) => u.id !== +del.dataset.del); render(); }
    });
    ['role-filter', 'status-filter'].forEach((id) => $(id).addEventListener('change', render));
    $('user-search').addEventListener('input', render);
    $('add-user-btn').addEventListener('click', () => openModal(null));
    $('modal-close').addEventListener('click', closeModal);
    $('modal-cancel').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    $('user-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = { name: $('u-name').value.trim(), email: $('u-email').value.trim(), role: $('u-role').value, status: $('u-status').value };
      const id = +$('u-id').value;
      if (id) Object.assign(users.find((u) => u.id === id), data); else users.push({ id: nextId++, ...data });
      closeModal(); render();
    });
    render();
  }

  /* ---------- 5. Products page: category chips + search ---------- */
  const cards = document.querySelectorAll('[data-product]');
  if (cards.length) {
    const chips = document.querySelectorAll('[data-chip]');
    let cat = 'All';
    function filterProducts() {
      const q = $('product-search').value.trim().toLowerCase();
      let shown = 0;
      cards.forEach((c) => {
        const ok = (cat === 'All' || c.dataset.cat === cat) && c.dataset.name.toLowerCase().includes(q);
        c.classList.toggle('hidden', !ok); if (ok) shown++;
      });
      $('product-empty').classList.toggle('hidden', shown > 0);
    }
    chips.forEach((chip) => chip.addEventListener('click', () => {
      cat = chip.dataset.chip; chips.forEach((c) => setActive(c, c === chip)); filterProducts();
    }));
    $('product-search').addEventListener('input', filterProducts);
  }

  /* ---------- 6. Settings page: tabs, avatar preview, password check, saved message ---------- */
  const tabs = document.querySelectorAll('[data-tab]');
  if (tabs.length) {
    function showTab(name) {
      if (!document.querySelector(`[data-panel="${name}"]`)) name = 'profile';
      tabs.forEach((t) => setActive(t, t.dataset.tab === name));
      document.querySelectorAll('[data-panel]').forEach((p) => p.classList.toggle('hidden', p.dataset.panel !== name));
    }
    tabs.forEach((t) => t.addEventListener('click', () => { showTab(t.dataset.tab); history.replaceState(null, '', '#' + t.dataset.tab); }));
    showTab(location.hash.slice(1));

    $('avatar-input')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      $('avatar-img').src = URL.createObjectURL(file);
      $('avatar-img').classList.remove('hidden');
      $('avatar-initials').classList.add('hidden');
    });
    $('avatar-remove')?.addEventListener('click', () => {
      $('avatar-img').classList.add('hidden'); $('avatar-initials').classList.remove('hidden'); $('avatar-input').value = '';
    });
  }
  document.querySelectorAll('form[data-save]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const err = f.querySelector('.form-error');
    if (f.id === 'password-form') {
      const bad = $('pw-new').value.length < 8 ? 'New password must be at least 8 characters.' : $('pw-new').value !== $('pw-confirm').value ? 'Passwords do not match.' : '';
      if (err) { err.textContent = bad; err.classList.toggle('hidden', !bad); }
      if (bad) return;
      f.reset();
    }
    const msg = f.querySelector('.save-msg');
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 2500);
  }));
})();
