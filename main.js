document.documentElement.classList.add('js');


(function () {
  var row = document.getElementById('eggs');
  var count = window.innerWidth < 600 ? 9 : 16;
  for (var i = 0; i < count; i++) {
    var egg = document.createElement('span');
    egg.className = 'egg' + (i % 3 === 1 ? ' b' : '');
    egg.style.animationDelay = (0.15 + i * 0.11) + 's';
    row.appendChild(egg);
  }
})();


(function () {
  var items = [
    { name: 'White eggs, large',     info: 'Tray of 30', price: 4000, cls: '' },
    { name: 'Brown farm eggs',       info: 'Tray of 30', price: 4000, cls: 'b' },
    { name: 'Brown eggs, small box', info: 'Box of 10',  price: 2500, cls: 'b' },
    { name: 'Quail eggs',            info: 'Pack of 20', price: 2500, cls: 'q' }
  ];
  var counts = items.map(function () { return 0; });
  var box = document.getElementById('products');
  var sum = document.getElementById('sum');

  function money(n) {
    return n.toLocaleString('en-US').replace(/,/g, ' ') + ' so’m';
  }

  function updateTotal() {
    var total = 0;
    items.forEach(function (it, i) { total += it.price * counts[i]; });
    sum.textContent = money(total);
    // small zoom in and out on the total
    sum.classList.remove('bump');
    void sum.offsetWidth;
    sum.classList.add('bump');
  }

  items.forEach(function (it, i) {
    var card = document.createElement('div');
    card.className = 'item reveal';
    card.style.transitionDelay = (i * 0.1) + 's';
    card.innerHTML =
      '<div class="ico ' + it.cls + '"></div>' +
      '<h3>' + it.name + '</h3>' +
      '<small>' + it.info + '</small>' +
      '<div class="price">' + money(it.price) + '</div>' +
      '<div class="qty">' +
        '<button type="button" aria-label="Remove one ' + it.name + '">−</button>' +
        '<output aria-live="polite">0</output>' +
        '<button type="button" aria-label="Add one ' + it.name + '">+</button>' +
      '</div>';

    var buttons = card.querySelectorAll('button');
    var out = card.querySelector('output');
    buttons[0].onclick = function () {
      if (counts[i] > 0) { counts[i]--; out.textContent = counts[i]; updateTotal(); }
    };
    buttons[1].onclick = function () {
      counts[i]++; out.textContent = counts[i]; updateTotal();
    };
    box.appendChild(card);
  });
})();

(function () {
  var targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('show'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(function (el) { observer.observe(el); });
})();