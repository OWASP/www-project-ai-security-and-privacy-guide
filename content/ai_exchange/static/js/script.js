document.addEventListener('DOMContentLoaded', function () {
  try {
    var tables = Array.prototype.slice.call(document.querySelectorAll('table'));
    tables.forEach(function (table) {
      // Avoid reprocessing
      if (table.classList.contains('responsive-table')) return;

      var thead = table.querySelector('thead');
      var headerCells = thead ? Array.prototype.slice.call(thead.querySelectorAll('th')) : [];

      // If no thead, try to use the first row as header
      if (!headerCells.length) {
        var firstRow = table.querySelector('tr');
        if (firstRow) {
          headerCells = Array.prototype.slice.call(firstRow.querySelectorAll('th,td'));
        }
      }

      if (!headerCells.length) return; // cannot map labels

      var headerLabels = headerCells.map(function (cell) {
        return (cell.textContent || '').trim();
      });

      // Apply data-label to each td based on its column index
      var bodyRows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));
      // If no tbody, include all rows except the first if we used it for headers
      if (!bodyRows.length) {
        var allRows = Array.prototype.slice.call(table.querySelectorAll('tr'));
        if (allRows.length > 1) {
          bodyRows = allRows.slice(1);
        }
      }

      bodyRows.forEach(function (row) {
        Array.prototype.slice.call(row.children).forEach(function (cell, idx) {
          if (cell.tagName.toLowerCase() !== 'td') return;
          var label = headerLabels[idx] || '';
          if (!cell.hasAttribute('data-label') && label) {
            cell.setAttribute('data-label', label);
          }
        });
      });

      // Opt-in class for CSS transformation
      table.classList.add('responsive-table');
    });
  } catch (e) {
    // no-op
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const tocLinks = Array.from(
    document.querySelectorAll('.toc-content a[href^="#"]')
  );

  const sections = tocLinks
    .map(link => {
      const id = decodeURIComponent(link.hash.slice(1));
      return {
        link,
        heading: document.getElementById(id)
      };
    })
    .filter(item => item.heading);

  if (!sections.length) return;

  function updateActiveSection() {
    const threshold = 120;
    let active = sections[0];

    for (const section of sections) {
      if (section.heading.getBoundingClientRect().top <= threshold) {
        active = section;
      }
    }

    for (const section of sections) {
      const selected = section === active;
      section.link.classList.toggle("toc-active", selected);

      if (selected) {
        section.link.setAttribute("aria-current", "location");
      } else {
        section.link.removeAttribute("aria-current");
      }
    }
  }

  window.addEventListener("scroll", updateActiveSection, {
    passive: true
  });

  window.addEventListener("resize", updateActiveSection);
  window.addEventListener("hashchange", updateActiveSection);

  updateActiveSection();
});

// Back to top button

(function () {
  function initBackToTop() {
    const button = document.getElementById("back-to-top");

    if (!button) return;

    function updateVisibility() {
      button.hidden = window.scrollY < 300;
    }

    button.addEventListener("click", function () {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });

    window.addEventListener("scroll", updateVisibility, {
      passive: true
    });

    window.addEventListener("pageshow", updateVisibility);

    updateVisibility();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBackToTop);
  } else {
    initBackToTop();
  }
})();