/* Sign up for an access code: shared by comma-ltd.com (Comma, teachers) and scholarlab.net (Scholar Hub, students).
   Adds a "Sign up" button to the sign-in page. Requests go to the "Comma sign-ups" Google Apps Script.
   ▼ After you deploy the Apps Script, paste its Web app URL between the quotes on the next line. ▼ */
const SIGNUP_ENDPOINT = 'https://script.google.com/macros/s/AKfycby1jWaTEgqIqPZGIKKeDXFbhmuzOPlP304fAmFJJJLSNPPYTHNWHqNY5bdJhckTxm62/exec';

(() => {
  const ok = /^https:\/\/script\.google\.com\/(a\/macros\/[\w.-]+|macros)\/s\/[\w-]+\/exec$/.test(SIGNUP_ENDPOINT);
  const me = document.currentScript, host = location.hostname.replace(/^www\./, '');
  const SITE = (me && me.dataset.site) || (/scholarlab/.test(host) ? 'scholarlab' : /comma/.test(host) ? 'comma' : '');
  if (!ok || !SITE) return; /* nothing shows until the script's address is pasted above */
  window.SIGNUP = { endpoint: SIGNUP_ENDPOINT, site: SITE }; window.dispatchEvent(new Event('signup-ready')); /* the site uses this for its own sign-up form and live access checks */
  const T = {
    comma: { contact: 'admin@comma-ltd.com', title: 'Get your Comma access code', lead: 'Comma is free practice for teacher certification exams. Tell us who you are and we’ll email your access code.',
      extra: ['School or organization (optional)', 'suOrg', 'e.g. Lincoln High School'], opt: 'Email me about new Comma products, practice tests, and updates. Optional. You can unsubscribe anytime.' },
    scholarlab: { contact: 'admin@comma-ltd.com', title: 'Sign up for Scholar Hub', lead: 'Free practice for AP, high school, and middle school courses. Tell us who you are and we’ll email your access code.',
      extra: ['Class code (if your teacher gave you one)', 'suJoin', 'e.g. BIO-P2'], extra2: ['Your teacher’s email (optional)', 'suTeacher', 'teacher@school.org'],
      opt: 'Email me news about new products from Comma, the team behind Scholar Hub. Optional. If you’re under 14, ask a parent first. You can unsubscribe anytime.' },
  }[SITE];
  const css = `.su-cta{display:flex;flex-wrap:wrap;align-items:center;gap:10px 12px;margin:16px 0 14px;padding:13px 14px;border:1px dashed var(--line,#ccc);border-radius:10px;font-size:13.5px;line-height:1.45;color:var(--ink,#111)}
.su-cta .su-t{flex:1 1 200px;min-width:0}.su-cta .su-t b{font-weight:700}
.su-cta button{flex:none;font:inherit;font-weight:700;font-size:14px;padding:8px 16px;border-radius:9px;border:1.5px solid var(--accent,#1d3e9e);background:transparent;color:var(--accent,#1d3e9e);cursor:pointer;transition:background .15s,color .15s}
.su-cta button:hover,.su-cta button:focus-visible{background:var(--accent,#1d3e9e);color:var(--surface,#fff)}
@media (max-width:420px){.su-cta button{width:100%}}
.su-fg{line-height:1.6}.su-nw{white-space:nowrap}
.su-ov{position:fixed;inset:0;z-index:60;background:rgba(10,14,25,.55);display:grid;place-items:center;padding:16px;overflow:auto}
.su-card{width:min(460px,100%);background:var(--surface,#fff);color:var(--ink,#111);border:1px solid var(--line,#ddd);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.25);padding:22px 22px 18px}
.su-card h2{margin:0 0 6px;font-size:21px}.su-card p.su-lead{margin:0 0 14px;color:var(--muted,#555);font-size:14px;line-height:1.5}
.su-card label.su-f{display:grid;gap:5px;margin:0 0 12px;font-weight:600;font-size:13.5px}
.su-card input[type=text],.su-card input[type=email]{font:inherit;font-weight:400;font-size:15px;padding:9px 11px;border:1.5px solid var(--line,#ccc);border-radius:9px;background:var(--surface,#fff);color:var(--ink,#111);width:100%;box-sizing:border-box}
.su-card input:focus{outline:none;border-color:var(--accent,#1d3e9e)}
.su-opt{display:flex;gap:10px;align-items:flex-start;margin:4px 0 14px;font-size:13px;line-height:1.45;color:var(--muted,#555);cursor:pointer}
.su-opt input{margin-top:2px;width:17px;height:17px;flex:none;accent-color:var(--accent,#1d3e9e)}
.su-agree{display:grid;gap:9px;margin:4px 0 12px;padding:11px 12px;border:1.5px solid var(--line,#ddd);border-radius:10px}.su-agree .su-opt{margin:0;color:var(--ink,#111)}.su-opt a{color:var(--accent,#1d3e9e);font-weight:600;white-space:nowrap}
.su-row{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}
.su-row button{font:inherit;font-weight:700;font-size:14px;padding:9px 16px;border-radius:9px;cursor:pointer;border:1.5px solid var(--line,#ccc);background:transparent;color:var(--ink,#111)}
.su-row button.su-go{background:var(--accent,#1d3e9e);border-color:var(--accent,#1d3e9e);color:var(--surface,#fff)}
.su-row button:disabled{opacity:.55;cursor:default}
.su-msg{min-height:1.2em;margin:0 0 10px;font-size:13.5px;font-weight:600}.su-msg.bad{color:var(--bad,#a8361f)}.su-msg.good{color:var(--good,#2a6b40)}
.su-done{text-align:center;padding:10px 0 4px}.su-done .su-ic{font-size:34px;line-height:1;margin-bottom:6px}
.su-hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;opacity:0}
.su-small{font-size:12px;color:var(--muted,#666);margin:10px 0 0}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const field = ([label, id, ph], type = 'text') => `<label class="su-f">${esc(label)}<input type="${type}" id="${id}" placeholder="${esc(ph)}" autocomplete="off" maxlength="80"></label>`;

  function open() {
    const ov = document.createElement('div'); ov.className = 'su-ov';
    ov.innerHTML = `<div class="su-card" role="dialog" aria-modal="true" aria-labelledby="suH"><form id="suF" novalidate>
      <h2 id="suH">${esc(T.title)}</h2><p class="su-lead">${esc(T.lead)}</p>
      <label class="su-f">Full name<input type="text" id="suName" autocomplete="name" maxlength="60" placeholder="First and last name"></label>
      <label class="su-f">Email<input type="email" id="suEmail" autocomplete="email" maxlength="80" placeholder="you@school.org"></label>
      ${field(T.extra)}${T.extra2 ? field(T.extra2, 'email') : ''}
      <input class="su-hp" id="suHp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="su-agree"><label class="su-opt"><input type="checkbox" id="suAg1" required><span>I agree to the <a href="/legal.html#terms" target="_blank" rel="noopener">Terms of Service</a> and <a href="/legal.html#privacy" target="_blank" rel="noopener">Privacy Policy</a>.</span></label>
        <label class="su-opt"><input type="checkbox" id="suAg2" required><span>I agree to follow the <a href="/legal.html#guidelines" target="_blank" rel="noopener">Community Guidelines</a>.</span></label></div>
      <label class="su-opt"><input type="checkbox" id="suOpt"><span>${esc(T.opt)}</span></label>
      <p class="su-msg" id="suMsg" role="status"></p>
      <div class="su-row"><button type="button" id="suX">Cancel</button><button type="submit" class="su-go" id="suGo">Sign up</button></div>
      <p class="su-small">We use your email only to send your access code and, if you tick the box, product news. Questions: ${T.contact}</p></form></div>`;
    document.body.appendChild(ov);
    const $ = s => ov.querySelector(s), close = () => { ov.remove(); document.removeEventListener('keydown', onKey); };
    const onKey = e => { if (e.key === 'Escape') close(); }; document.addEventListener('keydown', onKey);
    ov.addEventListener('click', e => { if (e.target === ov) close(); }); $('#suX').onclick = close;
    const g = document.getElementById('gName'); if (g && /@/.test(g.value)) $('#suEmail').value = g.value.trim();
    $('#suName').focus();
    $('#suF').onsubmit = async e => {
      e.preventDefault(); const msg = (t, c) => { $('#suMsg').textContent = t; $('#suMsg').className = 'su-msg ' + (c || ''); };
      const name = $('#suName').value.trim().replace(/\s+/g, ' '), email = $('#suEmail').value.trim().toLowerCase();
      if (name.length < 2) { msg('Please enter your name.', 'bad'); return $('#suName').focus(); }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg('Please enter a valid email address.', 'bad'); return $('#suEmail').focus(); }
      if (!$('#suAg1').checked || !$('#suAg2').checked) { msg('Please tick both boxes to agree to the Terms of Service, Privacy Policy and Community Guidelines.', 'bad'); return $(!$('#suAg1').checked ? '#suAg1' : '#suAg2').focus(); }
      const join = $('#suJoin') ? $('#suJoin').value.trim() : '', org = $('#suOrg') ? $('#suOrg').value.trim() : '', tch = $('#suTeacher') ? $('#suTeacher').value.trim() : '';
      const details = [org && 'Organization: ' + org, tch && 'Teacher: ' + tch, join && 'Class code: ' + join].filter(Boolean).join(' · ');
      $('#suGo').disabled = true; msg('Sending…');
      try {
        const r = await fetch(SIGNUP_ENDPOINT, { method: 'POST', body: JSON.stringify({ site: SITE, name, email, join, details, agree: true, agreeText: 'I agree to the Terms of Service and Privacy Policy. I agree to follow the Community Guidelines.', terms: '2026-10-29', optIn: $('#suOpt').checked, optInText: T.opt, hp: $('#suHp').value }) });
        const d = await r.json();
        if (!d.ok) { msg(d.msg || 'Something went wrong. Please try again.', 'bad'); $('#suGo').disabled = false; return; }
        $('.su-card').innerHTML = `<div class="su-done"><div class="su-ic">${d.status === 'sent' ? '✉️' : '⏳'}</div><h2>${d.status === 'sent' ? 'Check your email' : 'Request sent'}</h2><p class="su-lead">${esc(d.msg)}</p><p class="su-small">Don’t see it in a few minutes? Check your spam folder.</p><div class="su-row" style="justify-content:center"><button type="button" class="su-go" id="suOk">OK</button></div></div>`;
        $('#suOk').onclick = close; $('#suOk').focus();
      } catch (er) { msg('Couldn’t reach the sign-up service. Check your connection, or email ' + T.contact + '.', 'bad'); $('#suGo').disabled = false; }
    };
  }
  /* put the Sign up button on the sign-in page whenever it appears */
  const place = () => {
    /* a site that has its own New here? card (Scholar Hub): just switch it on and connect its button */
    const nat = document.querySelector('#suOpen[data-native]');
    if (nat) { window.SIGNUP = { endpoint: SIGNUP_ENDPOINT, site: SITE }; if (!nat.dataset.bound) { nat.dataset.bound = '1'; const b = nat.closest('[data-su-box]'); if (b) b.hidden = false;
      document.querySelectorAll('[data-su-show]').forEach(e => { e.hidden = false; }); document.querySelectorAll('[data-su-hide]').forEach(e => { e.hidden = true; }); } return; }
    const f = document.getElementById('gForgot'); if (!f || document.getElementById('suOpen')) return;
    const p = f.closest('p') || f; const box = document.createElement('div'); box.className = 'su-cta';
    box.innerHTML = `<span class="su-t"><b>New here?</b> Sign up and we’ll email you a code.</span><button type="button" id="suOpen">Sign up</button>`;
    p.parentNode.insertBefore(box, p); box.querySelector('button').onclick = open;
    /* the "Forgot your code?" line: the link on its own line, then one sentence that points to Sign up, with the email kept whole */
    if (p !== f) { p.classList.add('su-fg');
      for (const n of [...p.childNodes]) { const m = n.nodeType === 3 && n.textContent.match(/^[\s\u00b7]*Don.t have a code\?[^(]*\(([^()\s]+@[^()\s]+)\)\.?\s*$/);
        if (m) { const e = document.createElement('span'); e.className = 'su-nw'; e.textContent = m[1]; n.replaceWith(document.createElement('br'), 'Don\u2019t have a code? Sign up for one, or email ', e, '.'); } } }
  };
  new MutationObserver(place).observe(document.body, { childList: true, subtree: true }); place();
})();
