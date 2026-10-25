// Small enhancements only; every section reads fine without JavaScript.
(function () {
  // Prototype link from assets/config.js. Without a URL, the "undocumented" note stays.
  var cfg = window.SITE_CONFIG || {}
  if (cfg.prototypeUrl) {
    document.querySelectorAll('[data-prototype-link]').forEach(function (a) { a.href = cfg.prototypeUrl; a.hidden = false })
    document.querySelectorAll('[data-prototype-missing]').forEach(function (el) { el.hidden = true })
  }

  // Mobile menu
  var btn = document.querySelector('.menu-btn')
  var nav = document.getElementById('site-nav')
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('nav--open')
      btn.setAttribute('aria-expanded', String(open))
    })
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('nav--open'); btn.setAttribute('aria-expanded', 'false') }
    })
  }

  // Prompt filters: phase chips + text search
  var cards = Array.prototype.slice.call(document.querySelectorAll('.prompt[data-search]'))
  if (!cards.length) return
  var chips = document.querySelectorAll('.filters .chip')
  var input = document.querySelector('[data-search-input]')
  var count = document.querySelector('[data-count]')
  var days = document.querySelectorAll('.prompts .day')
  var phase = 'all'

  function apply() {
    var q = (input.value || '').trim().toLowerCase()
    var shown = 0
    cards.forEach(function (c) {
      var ok = (phase === 'all' || c.dataset.phase === phase) && (!q || c.dataset.search.indexOf(q) !== -1)
      c.hidden = !ok
      if (ok) shown++
    })
    days.forEach(function (d) {
      var el = d.nextElementSibling
      var any = false
      while (el && !el.classList.contains('day')) { if (!el.hidden) any = true; el = el.nextElementSibling }
      d.hidden = !any
    })
    count.textContent = shown === cards.length ? cards.length + ' prompts' : shown + ' of ' + cards.length + ' prompts'
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      phase = chip.dataset.phase
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)) })
      apply()
    })
  })
  input.addEventListener('input', apply)

  var toggle = document.querySelector('[data-toggle-all]')
  var details = document.querySelectorAll('.prompt__details')
  toggle.addEventListener('click', function () {
    var open = toggle.dataset.open !== 'true'
    details.forEach(function (d) { d.open = open })
    toggle.dataset.open = String(open)
    toggle.textContent = open ? 'Collapse all AI outputs' : 'Expand all AI outputs'
  })

  // A link to a prompt (#p-012) clears filters so the card is visible.
  function reveal() {
    var id = location.hash.slice(1)
    var el = id && document.getElementById(id)
    if (el && el.hidden) {
      phase = 'all'; input.value = ''
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.phase === 'all')) })
      apply(); el.scrollIntoView()
    }
  }
  window.addEventListener('hashchange', reveal)
})()
