// SPDX-License-Identifier: MIT
/* Contribution analysis course: lesson behaviour (v2).
   - Quiz: <div class="quiz" data-quiz="ID" data-title="..."></div> + <script type="application/json" id="ID">
     holding [{stem, options:[4], answer, feedback:[4]}]. One question at a time, keys 1 to 4 or A to D.
   - Contents rail and strip are built from h2[id] inside .main; the current section is marked as you read.
   - Reveal: <button data-reveal="ID" data-show="..." data-hide="..."> toggles #ID.
   - Draft saving: <textarea data-save="KEY"> keeps the learner's draft in this browser only.
   - Self-check tally: <ul class="checks" data-tally="ID"> counts ticked boxes into #ID.
   - Package explorer: <div class="explorer" data-explorer> with .factor[data-role=member|outside] buttons.
   - Pathway explorer: <div data-pathway> with .pw-link[data-panel] buttons and .pw-panel elements.
   - Degree control: <div data-degree> with button[data-out] options and a .degree-out element. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* reading progress */
  var bar = $(".progress span");
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* contents */
  var heads = $$(".main h2[id]");
  function listHtml() {
    return heads.map(function (h) {
      var label = h.getAttribute("data-short") || h.textContent.replace(/^\s*\d+\s*/, "");
      return '<li><a href="#' + h.id + '">' + label + "</a></li>";
    }).join("");
  }
  var rail = $(".rail ol"), strip = $(".contents-strip ol");
  if (rail) rail.innerHTML = listHtml();
  if (strip) strip.innerHTML = listHtml();
  if (rail && "IntersectionObserver" in window) {
    var links = $$("a", rail);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle("here", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "0px 0px -70% 0px" });
    heads.forEach(function (h) { io.observe(h); });
  }

  /* quiz */
  function quiz(host) {
    var data;
    try { data = JSON.parse(document.getElementById(host.dataset.quiz).textContent); }
    catch (e) { host.textContent = "The questions failed to load. Reload the page to try again."; return; }
    var title = host.dataset.title || "Check yourself";
    var order = data.map(function (_, i) { return i; });
    var result = {}, pos = 0;
    host.setAttribute("role", "region"); host.setAttribute("aria-label", title);

    function head() {
      var pips = order.map(function (qi, i) {
        var c = result[qi] === true ? "ok" : result[qi] === false ? "miss" : i === pos ? "now" : "";
        return '<span class="pip ' + c + '"></span>';
      }).join("");
      var label = pos < order.length ? "Question " + (pos + 1) + " of " + order.length : "Your score";
      return '<div class="q-head"><span>' + label + '</span><span class="pips" aria-hidden="true">' + pips + "</span></div>";
    }
    function show() {
      if (pos >= order.length) return done();
      var qi = order[pos], q = data[qi];
      host.innerHTML = head() + '<div class="q-body q-in"><p class="q-stem">' + q.stem + '</p><div class="q-opts" role="group"></div><div class="q-fb" aria-live="polite"></div></div>';
      var opts = $(".q-opts", host), fb = $(".q-fb", host);
      q.options.forEach(function (o, oi) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "q-opt";
        b.innerHTML = '<span class="k">' + "ABCD"[oi] + '</span><span class="o"></span><span class="mark" aria-hidden="true"></span>';
        $(".o", b).textContent = o;
        b.addEventListener("click", function () { answer(oi); });
        opts.appendChild(b);
      });
      function answer(oi) {
        if (result[qi] !== undefined) return;
        var ok = oi === q.answer, bs = $$(".q-opt", opts);
        result[qi] = ok;
        bs.forEach(function (x, i) {
          x.disabled = true;
          if (i === q.answer) { x.classList.add("right"); $(".mark", x).textContent = "✓"; }
          else if (i === oi) { x.classList.add("wrong"); $(".mark", x).textContent = "✗"; }
          else x.classList.add("faded");
        });
        fb.innerHTML = ok
          ? "<p><strong>Correct.</strong> " + q.feedback[oi] + "</p>"
          : "<p><strong>Not quite.</strong> " + q.feedback[oi] + "</p><p><strong>The answer:</strong> " + q.feedback[q.answer] + "</p>";
        $(".q-head", host).outerHTML = head();
        var foot = document.createElement("div"); foot.className = "q-foot";
        var next = document.createElement("button"); next.type = "button"; next.className = "btn";
        next.textContent = pos + 1 < order.length ? "Next question" : "See your score";
        next.addEventListener("click", function () { pos++; show(); var f = $(".q-opt, .q-done .btn", host); if (f) f.focus({ preventScroll: true }); });
        foot.appendChild(next); host.appendChild(foot);
        next.focus({ preventScroll: true });
      }
      host.onkeydown = function (e) {
        var k = e.key.toUpperCase(), i = "1234".indexOf(k); if (i < 0) i = "ABCD".indexOf(k);
        if (i >= 0 && i < q.options.length && result[qi] === undefined && !/TEXTAREA|INPUT/.test(document.activeElement.tagName)) { e.preventDefault(); answer(i); }
      };
    }
    function done() {
      var right = order.filter(function (qi) { return result[qi]; }).length;
      var missed = order.filter(function (qi) { return !result[qi]; });
      var msg = missed.length === 0 ? "All correct. Come back in a few days and try again: spacing is what makes it stick."
        : "Look back at the sections behind the ones you missed, then retry them.";
      host.innerHTML = head() + '<div class="q-done q-in"><p class="big">' + right + " of " + order.length + "</p><p>" + msg + "</p>" +
        (missed.length ? "<ul>" + missed.map(function (qi) { return "<li>" + data[qi].stem + "</li>"; }).join("") + "</ul>" : "") +
        '<div class="btn-row"></div></div>';
      var row = $(".btn-row", host);
      if (missed.length) {
        var r = document.createElement("button"); r.type = "button"; r.className = "btn";
        r.textContent = missed.length === 1 ? "Retry the one you missed" : "Retry the " + missed.length + " you missed";
        r.addEventListener("click", function () { order = missed; missed.forEach(function (qi) { delete result[qi]; }); pos = 0; show(); });
        row.appendChild(r);
      }
      var a = document.createElement("button"); a.type = "button"; a.className = "btn ghost"; a.textContent = "Start again";
      a.addEventListener("click", function () { order = data.map(function (_, i) { return i; }); result = {}; pos = 0; show(); });
      row.appendChild(a);
      host.onkeydown = null;
    }
    show();
  }
  $$("[data-quiz]").forEach(quiz);

  /* reveal */
  $$("[data-reveal]").forEach(function (b) {
    var t = document.getElementById(b.dataset.reveal); if (!t) return;
    b.setAttribute("aria-expanded", "false"); b.setAttribute("aria-controls", t.id);
    b.addEventListener("click", function () {
      t.hidden = !t.hidden;
      b.setAttribute("aria-expanded", String(!t.hidden));
      b.textContent = t.hidden ? b.dataset.show : b.dataset.hide;
    });
  });

  /* drafts */
  $$("textarea[data-save]").forEach(function (ta) {
    var key = "ca-course:" + ta.dataset.save, note = document.getElementById(ta.id + "-saved"), t;
    var v = store(key); if (v) ta.value = v;
    ta.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () { store(key, ta.value); if (note) note.textContent = "Draft kept in this browser."; }, 400);
    });
  });

  /* self-check tally */
  $$("ul.checks[data-tally]").forEach(function (ul) {
    var out = document.getElementById(ul.dataset.tally), boxes = $$("input[type=checkbox]", ul);
    function upd() { var n = boxes.filter(function (b) { return b.checked; }).length; if (out) out.textContent = n + " of " + boxes.length + " checks met"; }
    boxes.forEach(function (b) { b.addEventListener("change", upd); }); upd();
  });

  /* package explorer */
  $$("[data-explorer]").forEach(function (ex) {
    var fs = $$(".factor", ex), out = $(".readout", ex), oc = $(".outcome .s", ex);
    function name(f) { return f.dataset.name; }
    function upd() {
      var members = fs.filter(function (f) { return f.dataset.role === "member"; });
      var off = members.filter(function (f) { return f.getAttribute("aria-pressed") !== "true"; });
      var ext = fs.filter(function (f) { return f.dataset.role === "outside" && f.getAttribute("aria-pressed") === "true"; });
      var complete = off.length === 0;
      ex.classList.toggle("off", !complete);
      oc.textContent = complete ? ex.dataset.outcomeOn : ex.dataset.outcomeOff;
      var html;
      if (complete) {
        html = "<b>The package is complete</b>" + (ex.dataset.msgComplete || "Together these factors are sufficient for the change. Each is necessary to this package: switch any one off and this route no longer produces it.");
      } else if (off.length === 1 && off[0].dataset.key === "intervention") {
        html = "<b>The package is incomplete</b>Without the intervention this package cannot produce the change. If the change still appeared, a different package produced it. That is what it means for the intervention to be a necessary part.";
      } else {
        html = "<b>The package is incomplete</b>Without " + off.map(name).join(" and ") + ", the intervention alone is not enough. This is why Mayne calls each member necessary but insufficient on its own.";
      }
      if (ext.length && ex.dataset.msgOutside) html += " <span class='quiet'>" + ex.dataset.msgOutside + "</span>";
      out.innerHTML = html;
    }
    fs.forEach(function (f) { f.addEventListener("click", function () { f.setAttribute("aria-pressed", String(f.getAttribute("aria-pressed") !== "true")); upd(); }); });
    upd();
  });
  /* pathway explorer: buttons .pw-link[data-panel] reveal one panel at a time */
  $$("[data-pathway]").forEach(function (pw) {
    var links = $$(".pw-link", pw), panels = $$(".pw-panel", pw);
    function pick(btn) {
      links.forEach(function (l) { l.setAttribute("aria-pressed", String(l === btn)); });
      panels.forEach(function (p) { p.hidden = p.id !== btn.dataset.panel; });
    }
    links.forEach(function (l) { l.addEventListener("click", function () { pick(l); }); });
    var start = links.filter(function (l) { return l.getAttribute("aria-pressed") === "true"; })[0] || links[0];
    if (start) pick(start);
  });

  /* degree control: buttons [data-out] write their text into .degree-out */
  $$("[data-degree]").forEach(function (dg) {
    var bs = $$("button[data-out]", dg), out = $(".degree-out", dg);
    function pick(b) { bs.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); }); out.innerHTML = b.dataset.out; dg.dataset.level = b.dataset.level || ""; }
    bs.forEach(function (b) { b.addEventListener("click", function () { pick(b); }); });
    pick(bs.filter(function (b) { return b.getAttribute("aria-pressed") === "true"; })[0] || bs[bs.length - 1]);
  });
})();
