function scrollToTask(id){
  const el = document.getElementById(id);
  if (!el) return;
  document.querySelectorAll('.task').forEach(t=>t.classList.remove('highlight'));
  el.classList.add('highlight');
  el.scrollIntoView({behavior:'smooth', block:'center'});
}

function makeLinks(){
  document.querySelectorAll('[data-deps]').forEach(card=>{
    const id = card.id;
    const deps = card.dataset.deps ? card.dataset.deps.split(',').filter(Boolean) : [];
    const depsWrap = card.querySelector('.deps-list');
    deps.forEach((d, idx)=>{
      const span = document.createElement('span');
      span.className = 'linklike';
      span.textContent = document.getElementById(d)?.dataset.title || d;
      span.onclick = ()=>scrollToTask(d);
      span.setAttribute('data-dep-src', d);
      depsWrap.appendChild(span);
      if (idx < deps.length - 1){
        const s = document.createElement('span');
        s.className = 'sep';
        s.textContent = ', ';
        depsWrap.appendChild(s);
      }
    });

    const unlocks = window.revMap ? (window.revMap[id] || []) : [];
    const unlWrap = card.querySelector('.unlocks-list');
    unlocks.forEach((u, idx)=>{
      const span = document.createElement('span');
      span.className = 'linklike';
      span.textContent = document.getElementById(u)?.dataset.title || u;
      span.onclick = ()=>scrollToTask(u);
      unlWrap.appendChild(span);
      if (idx < unlocks.length - 1){
        const s = document.createElement('span');
        s.className = 'sep';
        s.textContent = ', ';
        unlWrap.appendChild(s);
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', makeLinks);

// ---- Done + Ready states ----
(function(){
  const KEY = 'doneTasks.v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; } };
  const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

  function applyReady(set){
    document.querySelectorAll('.task').forEach(card=>{
      if(card.classList.contains('done')){
        card.classList.remove('ready');
        return;
      }
      const deps = (card.dataset.deps || '').split(',').filter(Boolean);
      if(deps.length === 0 || deps.every(d => set.has(d))){
        card.classList.add('ready');
      } else {
        card.classList.remove('ready');
      }
    });
  }

  function applyDoneUI(set){
    document.querySelectorAll('.task').forEach(el=>{
      if (set.has(el.id)) el.classList.add('done'); else el.classList.remove('done');
    });
    // mark dependencies
    document.querySelectorAll('.deps-list .linklike').forEach(el=>{
      const src = el.getAttribute('data-dep-src');
      if (src && set.has(src)) el.classList.add('dep-done'); else el.classList.remove('dep-done');
    });
    // also update ready-state
    applyReady(set);
  }

  function toggleById(id){
    const current = new Set(load());
    if (current.has(id)) current.delete(id); else current.add(id);
    save(Array.from(current));
    applyDoneUI(current);
  }

  document.addEventListener('contextmenu', function(e){
    const card = e.target.closest('.task');
    if (card){
      e.preventDefault();
      e.stopImmediatePropagation();
      toggleById(card.id);
    }
  }, true);

  document.addEventListener('DOMContentLoaded', ()=>applyDoneUI(new Set(load())));

  if ('MutationObserver' in window){
    const wrapper = document.querySelector('.wrapper');
    if (wrapper){
      const obs = new MutationObserver(()=>applyDoneUI(new Set(load())));
      obs.observe(wrapper, {subtree:true, childList:true});
    }
  }

  window.__applyDoneUI = ()=>applyDoneUI(new Set(load()));
})();

document.addEventListener('DOMContentLoaded', function(){
  // якщо в localStorage вже є конфіг і токен
  const cfg = JSON.parse(localStorage.getItem('ghSyncCfg.v1') || '{}');
  const token = document.getElementById('gh_token')?.value.trim();
  if (cfg.repo && cfg.branch && cfg.path && token){
    // зробити авто-Load
    setTimeout(()=> {
      document.getElementById('btn_load')?.click();
    }, 300); // невелика пауза щоб DOM встиг намалюватися
  }
});
