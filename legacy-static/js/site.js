(function () {
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear().toString();

  var btn = document.getElementById("nav-toggle");
  var header = document.querySelector(".site-header, .pixel-header");
  if (btn && header) {
    btn.addEventListener("click", function () {
      var open = header.classList.toggle("is-menu-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function () {
      if (header && header.classList.contains("is-menu-open")) {
        header.classList.remove("is-menu-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });
})();
