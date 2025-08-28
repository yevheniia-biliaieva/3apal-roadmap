function scrollToTask(id) {
				const el = document.getElementById(id);
				if (!el) return;
				document
					.querySelectorAll('.task')
					.forEach((t) => t.classList.remove('highlight'));
				el.classList.add('highlight');
				el.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}

			window.revMap = {
				brand_doc: ['logo_system', 'tone'],
				positioning: ['logo_system'],
				logo_system: [
					'colors_fonts',
					'popup_visuals',
					'tags_design',
					'labels_design',
					'inserts_design',
				],
				colors_fonts: [
					'icons_patterns',
					'ig_templates',
					'popup_visuals',
					'tags_design',
					'labels_design',
					'inserts_design',
				],
				content_pillars: ['ig_templates', 'content_strategy'],
				ig_templates: ['social_pack', 'content_plan', 'visuals_posts'],
				popup_visuals: ['popup_posters'],
				pouch_patterns: ['samples_sew'],
				bag_patterns: ['samples_sew'],
				lighter_case_patterns: ['samples_sew'],
				samples_sew: ['feedback_internal', 'samples_photos'],
				feedback_internal: ['feedback_external'],
				feedback_external: ['feedback_table'],
				feedback_table: ['design_corrections'],
				lighter_designs: ['lighter_test_print'],
				design_corrections: ['product_brief', 'final_samples_check'],
				suppliers_search: ['product_brief', 'backup_vendors'],
				lighter_test_print: ['product_brief'],
				product_brief: ['techpack_bom', 'copies', 'sales_platform'],
				techpack_bom: ['qcqa_checklist', 'mass_production'],
				content_strategy: [
					'content_plan',
					'copies',
					'ugc_concept',
					'media_plan',
					'crisis_guide',
				],
				ugc_concept: ['first_mentions', 'ugc_campaign'],
				content_plan: [
					'micro_influencers',
					'prepr_teaser',
					'shoot_shotlist',
					'launch_posts',
				],
				micro_influencers: ['promo_kits'],
				visuals_posts: ['prepr_teaser', 'launch_posts'],
				sales_platform: [
					'ref_program',
					'orders_processing',
					'welcome_msgs',
					'popup_pos',
					'popup_sales_scripts',
				],
				orders_processing: ['faq_support', 'real_shipments'],
				real_shipments: ['returns', 'reviews_cases'],
				qcqa_checklist: ['mass_production'],
				mass_production: [
					'crash_tests',
					'final_qc',
					'tags_attached',
					'care_labels',
					'thank_you_cards',
					'popup_invite_boxes',
				],
				crash_tests: ['final_qc'],
				tags_design: ['tags_attached'],
				labels_design: ['care_labels'],
				inserts_design: ['thank_you_cards'],
				final_qc: ['packaging', 'final_photo_archive'],
				tags_attached: ['packaging'],
				care_labels: ['packaging'],
				thank_you_cards: ['packaging'],
				prepr_teaser: ['teaser_reveal_drop'],
				media_plan: ['teaser_reveal_drop'],
				promo_kits: ['influencers_ops'],
				ugc_campaign: ['reviews_cases'],
				packaging: ['popup_location', 'popup_inventory'],
				teaser_reveal_drop: ['popup_location', 'popup_invites'],
				popup_location: ['popup_zoning', 'popup_mirrors', 'popup_script'],
				popup_zoning: [
					'popup_decor',
					'popup_upcycle',
					'popup_photozone',
					'popup_planogram',
				],
				popup_decor: ['popup_garlands'],
				popup_posters: ['popup_mirrors'],
				popup_invites: ['popup_invite_boxes'],
				popup_script: ['popup_playlist', 'popup_photovideo'],
				popup_photovideo: ['popup_feedback', 'popup_thanks_digest'],
				popup_feedback: ['popup_thanks_digest'],
			};
			window.edgeGaps = {
				logo_system: { brand_doc: '1–2 дні', positioning: '1–2 дні' },
				colors_fonts: { logo_system: '1–2 дні' },
				icons_patterns: { colors_fonts: '2–3 дні' },
				ig_templates: { colors_fonts: '1–2 дні', content_pillars: '1–2 дні' },
				social_pack: { ig_templates: '1–2 дні' },
				popup_visuals: { logo_system: '1–2 дні', colors_fonts: '1–2 дні' },
				popup_posters: { popup_visuals: '1–2 дні' },
				tags_design: { logo_system: '1–2 дні', colors_fonts: '1–2 дні' },
				labels_design: { logo_system: '1–2 дні', colors_fonts: '1–2 дні' },
				inserts_design: { logo_system: '1–2 дні', colors_fonts: '1–2 дні' },
				samples_sew: {
					pouch_patterns: '2–3 дні',
					bag_patterns: '2–3 дні',
					lighter_case_patterns: '2–3 дні',
				},
				feedback_internal: { samples_sew: '2–3 дні' },
				feedback_external: { feedback_internal: '2–3 дні' },
				feedback_table: { feedback_external: '2–3 дні' },
				design_corrections: { feedback_table: '2–3 дні' },
				lighter_test_print: { lighter_designs: '1–2 дні' },
				product_brief: {
					design_corrections: '2–3 дні',
					suppliers_search: '1–2 дні',
					lighter_test_print: '1–2 дні',
				},
				techpack_bom: { product_brief: '2–3 дні' },
				qcqa_checklist: { techpack_bom: '2–3 дні' },
				samples_photos: { samples_sew: '2–3 дні' },
				backup_vendors: { suppliers_search: '1–2 дні' },
				content_strategy: { content_pillars: '1–2 дні' },
				content_plan: { content_strategy: '1–2 дні', ig_templates: '1–2 дні' },
				visuals_posts: { ig_templates: '1–2 дні' },
				copies: { content_strategy: '1–2 дні', product_brief: '1–2 дні' },
				tone: { brand_doc: '1–2 дні' },
				ugc_concept: { content_strategy: '1–2 дні' },
				first_mentions: { ugc_concept: '1–2 дні' },
				micro_influencers: { content_plan: '1–2 дні' },
				promo_kits: { micro_influencers: '1–2 дні' },
				prepr_teaser: { content_plan: '1–2 дні', visuals_posts: '1–2 дні' },
				media_plan: { content_strategy: '1–2 дні' },
				shoot_shotlist: { content_plan: '1–2 дні' },
				ref_program: { sales_platform: '1–2 дні' },
				crisis_guide: { content_strategy: '1–2 дні' },
				sales_platform: { product_brief: '1–2 дні' },
				orders_processing: { sales_platform: '1–2 дні' },
				faq_support: { orders_processing: '1–2 дні' },
				welcome_msgs: { sales_platform: '1–2 дні' },
				real_shipments: { orders_processing: '1–2 дні' },
				returns: { real_shipments: '1–2 дні' },
				mass_production: {
					techpack_bom: '5–7 днів',
					qcqa_checklist: '5–7 днів',
				},
				final_samples_check: { design_corrections: '2–3 дні' },
				crash_tests: { mass_production: '5–7 днів' },
				final_qc: { mass_production: '5–7 днів', crash_tests: '2–3 дні' },
				tags_attached: { tags_design: '1–2 дні', mass_production: '5–7 днів' },
				care_labels: { labels_design: '1–2 дні', mass_production: '5–7 днів' },
				thank_you_cards: {
					inserts_design: '1–2 дні',
					mass_production: '5–7 днів',
				},
				packaging: {
					final_qc: '5–7 днів',
					tags_attached: '5–7 днів',
					care_labels: '5–7 днів',
					thank_you_cards: '5–7 днів',
				},
				final_photo_archive: { final_qc: '2–3 дні' },
				teaser_reveal_drop: { prepr_teaser: '1–2 дні', media_plan: '1–2 дні' },
				influencers_ops: { promo_kits: '1–2 дні' },
				launch_posts: { content_plan: '1–2 дні', visuals_posts: '1–2 дні' },
				ugc_campaign: { ugc_concept: '1–2 дні' },
				reviews_cases: { real_shipments: '1–2 дні', ugc_campaign: '1–2 дні' },
				popup_location: {
					packaging: '5–7 днів',
					teaser_reveal_drop: '1–2 дні',
				},
				popup_zoning: { popup_location: '1–2 дні' },
				popup_decor: { popup_zoning: '1–2 дні' },
				popup_garlands: { popup_decor: '1–2 дні' },
				popup_mirrors: { popup_location: '1–2 дні', popup_posters: '1–2 дні' },
				popup_invites: { teaser_reveal_drop: '1–2 дні' },
				popup_invite_boxes: {
					mass_production: '5–7 днів',
					popup_invites: '1–2 дні',
				},
				popup_upcycle: { popup_zoning: '1–2 дні' },
				popup_photozone: { popup_zoning: '1–2 дні' },
				popup_script: { popup_location: '1–2 дні' },
				popup_playlist: { popup_script: '1–2 дні' },
				popup_pos: { sales_platform: '1–2 дні' },
				popup_inventory: { packaging: '5–7 днів' },
				popup_planogram: { popup_zoning: '1–2 дні' },
				popup_sales_scripts: { sales_platform: '1–2 дні' },
				popup_photovideo: { popup_script: '1–2 дні' },
				popup_feedback: { popup_photovideo: '2–3 дні' },
				popup_thanks_digest: {
					popup_feedback: '2–3 дні',
					popup_photovideo: '1–2 дні',
				},
			};

			function makeLinks() {
				document.querySelectorAll('[data-deps]').forEach((card) => {
					const id = card.id;
					const title = card.dataset.title;
					// Deps (what this depends on)
					const deps = card.dataset.deps
						? card.dataset.deps.split(',').filter(Boolean)
						: [];
					const depsWrap = card.querySelector('.deps-list');
					deps.forEach((d, idx) => {
						const span = document.createElement('span');
						span.className = 'linklike';
						span.textContent = document.getElementById(d)?.dataset.title || d;
						span.onclick = () => scrollToTask(d);
						depsWrap.appendChild(span);
						// gap badge
						const gap =
							window.edgeGaps[id] && window.edgeGaps[id][d]
								? window.edgeGaps[id][d]
								: null;
						if (gap) {
							const g = document.createElement('span');
							g.className = 'smallgap';
							g.textContent = '(~' + gap + ')';
							depsWrap.appendChild(g);
						}
						if (idx < deps.length - 1) {
							const s = document.createElement('span');
							s.className = 'sep';
							s.textContent = ', ';
							depsWrap.appendChild(s);
						}
					});

					// Unlocks (what this opens)
					const unlocks = window.revMap[id] || [];
					const unlWrap = card.querySelector('.unlocks-list');
					unlocks.forEach((u, idx) => {
						const span = document.createElement('span');
						span.className = 'linklike';
						span.textContent = document.getElementById(u)?.dataset.title || u;
						span.onclick = () => scrollToTask(u);
						unlWrap.appendChild(span);
						// gap badge is inverse: gap from this(id) to u
						const gap =
							window.edgeGaps[u] && window.edgeGaps[u][id]
								? window.edgeGaps[u][id]
								: null;
						if (gap) {
							const g = document.createElement('span');
							g.className = 'smallgap';
							g.textContent = '(~' + gap + ')';
							unlWrap.appendChild(g);
						}
						if (idx < unlocks.length - 1) {
							const s = document.createElement('span');
							s.className = 'sep';
							s.textContent = ', ';
							unlWrap.appendChild(s);
						}
					});
				});
			}

			document.addEventListener('DOMContentLoaded', makeLinks);
		

// ---- Right-click toggle 'done' state + persistence ----
(function(){
  const KEY = 'doneTasks.v1';
  const load = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; }
  };
  const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

  let done = new Set(load());

  function applyDoneStates(){
    document.querySelectorAll('.task').forEach(el=>{
      if(done.has(el.id)) el.classList.add('done'); else el.classList.remove('done');
    });
  }

  // On load, apply
  document.addEventListener('DOMContentLoaded', applyDoneStates);

  // Context menu handler
  document.addEventListener('contextmenu', function(e){
    const card = e.target.closest('.task');
    if(card){
      e.preventDefault();
      const id = card.id;
      if(done.has(id)){ done.delete(id); } else { done.add(id); }
      applyDoneStates();
      save(Array.from(done));
    }
  }, false);
})();


// ---- Mark dependency entries as done if their source cards are done ----
function applyDependencyMarks(doneSet){
  // Clear all first
  document.querySelectorAll('.deps-list .linklike').forEach(el=>{
    el.classList.remove('dep-done');
  });
  // Mark each dep link whose source task is done
  document.querySelectorAll('.deps-list .linklike[data-dep-src]').forEach(el=>{
    const srcId = el.getAttribute('data-dep-src');
    if (doneSet.has(srcId)) {
      el.classList.add('dep-done');
    }
  });
}

// Monkey-patch makeLinks to add data-dep-src onto dep links
(function(){
  const _oldMakeLinks = makeLinks;
  makeLinks = function(){
    _oldMakeLinks();
    // add data-dep-src to each dependency link (text already rendered)
    document.querySelectorAll('[data-deps]').forEach(card=>{
      const deps = card.dataset.deps ? card.dataset.deps.split(',').filter(Boolean) : [];
      const depsWrap = card.querySelector('.deps-list');
      // Map only the .linklike children in order to deps by index
      let idx = 0;
      depsWrap.querySelectorAll('.linklike').forEach(a=>{
        if (idx < deps.length) {
          a.setAttribute('data-dep-src', deps[idx]);
          idx++;
        }
      });
    });
  }
})();

// Integrate with existing done state logic
(function(){
  // Try to find our existing functions/vars
  const KEY = 'doneTasks.v1';
  const load = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; }
  };

  function getDoneSet(){
    return new Set(load());
  }

  // After DOM ready and initial makeLinks is done, apply marks
  document.addEventListener('DOMContentLoaded', function(){
    // delay a tick to let makeLinks build DOM
    setTimeout(()=>applyDependencyMarks(getDoneSet()), 0);
  });

  // Observe mutations to re-apply marks if any dynamic changes occur (not strictly needed)
  const obs = new MutationObserver(()=>applyDependencyMarks(getDoneSet()));
  document.addEventListener('DOMContentLoaded', function(){
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) obs.observe(wrapper, {subtree:true, childList:true});
  });

  // Hook into contextmenu toggle by intercepting class changes on .task
  document.addEventListener('contextmenu', function(e){
    const card = e.target.closest('.task');
    if(card){
      // allow existing handler to run then update marks slightly after
      setTimeout(()=>applyDependencyMarks(getDoneSet()), 30);
    }
  }, false);
})();


// ===== Dependency highlighting patch (robust) =====
(function(){
  const KEY = 'doneTasks.v1';
  const loadDone = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; }
  };

  // annotate dependency links inside each card with the real source task id
  function annotateDepsLinks(){
    document.querySelectorAll('[data-deps]').forEach(card=>{
      const deps = (card.dataset.deps || '').split(',').filter(Boolean);
      const links = card.querySelectorAll('.deps-list .linklike');
      // Map by index: each visible link corresponds to deps[index]
      links.forEach((a, i)=>{
        if (deps[i]) a.setAttribute('data-dep-src', deps[i]);
      });
    });
  }

  function applyDependencyMarks(){
    const doneSet = new Set(loadDone());
    // Clear all marks
    document.querySelectorAll('.deps-list .linklike').forEach(el=>{
      el.classList.remove('dep-done');
    });
    // Apply for those whose source is done
    document.querySelectorAll('.deps-list .linklike[data-dep-src]').forEach(el=>{
      if (doneSet.has(el.getAttribute('data-dep-src'))) {
        el.classList.add('dep-done');
      }
    });
  }

  function applyAll(){
    annotateDepsLinks();
    applyDependencyMarks();
  }

  // Run after DOM is built and makeLinks has created link nodes
  document.addEventListener('DOMContentLoaded', function(){
    // Initial pass (delayed to let original makeLinks run)
    setTimeout(applyAll, 0);
    // A second pass just in case (slower devices)
    setTimeout(applyAll, 100);
  });

  // Re-apply after right-click toggle (the original handler runs too)
  document.addEventListener('contextmenu', function(e){
    const card = e.target.closest('.task');
    if(card){
      // Wait a tick for original toggle to persist, then refresh
      setTimeout(applyAll, 30);
    }
  }, false);

  // Observe mutations (safety net)
  document.addEventListener('DOMContentLoaded', function(){
    const wrapper = document.querySelector('.wrapper');
    if (!('MutationObserver' in window) || !wrapper) return;
    const obs = new MutationObserver(()=>applyAll());
    obs.observe(wrapper, {subtree:true, childList:true});
  });
})();


// ===== Shared state via GitHub (client-side) =====
(function(){
  const KEY_CFG = 'ghSyncCfg.v1';
  const KEY_DONE = 'doneTasks.v1';

  function cfgGet(){
    try { return JSON.parse(localStorage.getItem(KEY_CFG) || '{}'); } catch(e){ return {}; }
  }
  function cfgSet(cfg){ localStorage.setItem(KEY_CFG, JSON.stringify(cfg)); }

  function getDone(){ try { return JSON.parse(localStorage.getItem(KEY_DONE) || '[]'); } catch(e){ return []; } }
  function setDone(arr){ localStorage.setItem(KEY_DONE, JSON.stringify(arr)); }

  function els(){
    return {
      repo: document.getElementById('gh_repo'),
      branch: document.getElementById('gh_branch'),
      path: document.getElementById('gh_path'),
      token: document.getElementById('gh_token'),
      load: document.getElementById('btn_load'),
      save: document.getElementById('btn_save'),
      status: document.getElementById('gh_status'),
    };
  }

  function show(msg, ok=true){
    const e = els().status;
    e.textContent = msg;
    e.style.color = ok ? '#9cc7a7' : '#ff9f9f';
  }

  async function ghFetchJSON(url, opts){
    const r = await fetch(url, opts);
    if (!r.ok) {
      const txt = await r.text();
      throw new Error('HTTP ' + r.status + ': ' + txt);
    }
    return r.json();
  }

  function b64Encode(str){
    if (window.btoa) return window.btoa(unescape(encodeURIComponent(str)));
    return Buffer.from(str, 'utf8').toString('base64');
  }

  async function loadState(){
    const {repo, branch, path, token} = readCfg();
    if (!repo || !branch || !path || !token) return show('Заповни всі поля для завантаження.', false);
    show('Завантажую...');
    try {
      const api = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
      const data = await ghFetchJSON(api, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json' }
      });
      // content is base64
      const content = atob(data.content.replace(/\\n/g,''));
      const json = JSON.parse(content || '[]');
      // Expect format: { done: ['id1','id2'], updatedAt: '...' } OR bare array
      const arr = Array.isArray(json) ? json : (json.done || []);
      setDone(arr);
      // Apply UI states
      document.querySelectorAll('.task').forEach(el=>{
        if (arr.includes(el.id)) el.classList.add('done'); else el.classList.remove('done');
      });
      // Also update dependency marks if helper exists
      if (typeof applyDependencyMarks === 'function') {
        setTimeout(()=>applyDependencyMarks(new Set(arr)),0);
      } else {
        // Fallback: trigger contextmenu patch which calls applyAll
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }
      show('Стан завантажено з GitHub.');
    } catch(e){
      show('Помилка завантаження: ' + e.message, false);
    }
  }

  async function saveState(){
    const {repo, branch, path, token} = readCfg();
    if (!repo || !branch || !path || !token) return show('Заповни всі поля для збереження.', false);
    show('Зберігаю...');
    try {
      const api = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}`;
      // need current sha if file exists
      let sha = null;
      try {
        const info = await ghFetchJSON(`${api}?ref=${encodeURIComponent(branch)}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json' }
        });
        sha = info.sha;
      } catch(e){
        // 404 -> new file, ignore
      }
      const bodyObj = {
        message: 'Update roadmap done state',
        branch,
        content: b64Encode(JSON.stringify({ done: getDone(), updatedAt: new Date().toISOString() }, null, 2)),
      };
      if (sha) bodyObj.sha = sha;
      const res = await ghFetchJSON(api, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json' },
        body: JSON.stringify(bodyObj)
      });
      show('Збережено в GitHub.');
    } catch(e){
      show('Помилка збереження: ' + e.message, false);
    }
  }

  function readCfg(){
    const repo = els().repo.value.trim();
    const branch = els().branch.value.trim() || 'main';
    const path = els().path.value.trim() || 'state.json';
    const token = els().token.value.trim();
    const cfg = {repo, branch, path};
    localStorage.setItem(KEY_CFG, JSON.stringify(cfg));
    // never persist token automatically for safety
    return {repo, branch, path, token};
  }

  function loadCfgToUI(){
    const cfg = cfgGet();
    if (cfg.repo) els().repo.value = cfg.repo;
    if (cfg.branch) els().branch.value = cfg.branch;
    if (cfg.path) els().path.value = cfg.path;
    // token intentionally not persisted
  }

  document.addEventListener('DOMContentLoaded', function(){
    loadCfgToUI();
    els().load.addEventListener('click', loadState);
    els().save.addEventListener('click', saveState);
  });
})();
