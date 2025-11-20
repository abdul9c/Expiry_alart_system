document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.querySelector('.product-table tbody');

  function computeStatus(expirationDateStr) {
    const today = new Date();
    const exp = new Date(expirationDateStr);
    const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'expired';
    if (diffDays <= 14) return 'less-than-2-weeks';
    return 'good';
  }

  function renderProducts(products) {
    tbody.innerHTML = '';
    products.forEach(p => {
      const tr = document.createElement('tr');
      const status = computeStatus(p.expiration_date);

      tr.innerHTML = `
        <td>${escapeHtml(p.name)}</td>
        <td>${escapeHtml(p.description)}</td>
        <td class="expiration-status" data-status="${status}">${formatStatusText(status)}</td>
        <td><button class="delete-btn" data-id="${p.id}">Delete</button></td>
      `;

      tbody.appendChild(tr);
    });

    // Attach delete handlers
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (!confirm('Delete this product?')) return;
        fetch(`/api/products/${id}`, { method: 'DELETE' })
          .then(res => {
            if (!res.ok) throw new Error('Failed to delete');
            load();
          })
          .catch(err => {
            console.error(err);
            alert('Error deleting product');
          });
      });
    });
  }

  function load() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => renderProducts(data.products || []))
      .catch(err => {
        console.error(err);
        tbody.innerHTML = '<tr><td colspan="4">Failed to load products.</td></tr>';
      });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatStatusText(status) {
    switch (status) {
      case 'expired': return 'Expired';
      case 'less-than-2-weeks': return 'Less than 2 weeks';
      default: return 'Good';
    }
  }

  load();
});
