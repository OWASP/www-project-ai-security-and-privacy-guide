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


