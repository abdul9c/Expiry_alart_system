document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const productDescription = document.getElementById('productDescription').value;

    if (productName.trim() === '' || expirationDate.trim() === '' || productDescription.trim() === '') {
      alert('Please fill in all fields.');
    } else {
      // Submit to backend API
      const payload = {
        name: productName.trim(),
        description: productDescription.trim(),
        expiration_date: expirationDate
      };

      fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add product');
        return res.json();
      })
      .then(data => {
        alert('Product added successfully');
        window.location.href = 'products.html';
      })
      .catch(err => {
        console.error(err);
        alert('Error adding product; check console for details.');
      });
    }
  });
});