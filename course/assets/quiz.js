// SPDX-License-Identifier: MIT
/* Reusable retrieval quiz.
   Usage: <div class="quiz" data-quiz="ID"></div> plus
   <script type="application/json" id="ID">[{stem, options:[...], answer: index, feedback:[...one per option]}]</script>
   Immediate feedback per question, running score, retry button. */
(function () {
  function build(host) {
    var data;
    try { data = JSON.parse(document.getElementById(host.dataset.quiz).textContent); } catch (e) { host.textContent = "Quiz data failed to load."; return; }
    var answered = 0, correct = 0;
    var score = document.createElement("p");
    score.className = "q-score";
    function setScore() { score.textContent = answered === data.length ? ("Score: " + correct + " of " + data.length + ". Retry in a few days for spacing.") : (answered + " of " + data.length + " answered"); }
    data.forEach(function (q, qi) {
      var box = document.createElement("div"); box.className = "q";
      var stem = document.createElement("p"); stem.className = "q-stem";
      stem.innerHTML = '<span class="q-num">' + (qi + 1) + '.</span>' + q.stem;
      var opts = document.createElement("div"); opts.className = "q-opts";
      var fb = document.createElement("div"); fb.className = "q-fb"; fb.setAttribute("aria-live", "polite");
      q.options.forEach(function (o, oi) {
        var b = document.createElement("button"); b.type = "button"; b.className = "q-opt"; b.textContent = o;
        b.addEventListener("click", function () {
          var buttons = opts.querySelectorAll("button");
          buttons.forEach(function (x) { x.disabled = true; });
          buttons[q.answer].classList.add("right");
          var ok = oi === q.answer;
          if (!ok) b.classList.add("wrong");
          answered++; if (ok) correct++;
          fb.innerHTML = "<strong>" + (ok ? "Correct. " : "Not quite. ") + "</strong>" + q.feedback[oi] + (ok ? "" : " " + q.feedback[q.answer]);
          setScore();
        });
        opts.appendChild(b);
      });
      box.appendChild(stem); box.appendChild(opts); box.appendChild(fb); host.appendChild(box);
    });
    var retry = document.createElement("button"); retry.type = "button"; retry.className = "btn ghost"; retry.textContent = "Reset quiz";
    retry.addEventListener("click", function () { host.innerHTML = ""; build(host); });
    setScore(); host.appendChild(score); host.appendChild(retry);
  }
  document.querySelectorAll("[data-quiz]").forEach(build);
})();
