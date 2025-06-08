  document.addEventListener('DOMContentLoaded', () => {
    const orderItems = document.querySelector('.summary-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderTotal = document.querySelector('.order-total');
    const orderSubTotal = document.querySelector('.subtotal');
    const orderShipping = document.querySelector('.shipping');
    const form = document.querySelector('form[name="checkout-form"]');

    let total = 0;
    let subtotal = 0;

    // Populate the order summary with cart items
    if (orderItems && cart) {
        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
            <img src="assets/images/${item.name.toLowerCase().replace(/\s+/g, '-')}.png" alt="${item.name}" class="cart-item-image" loading="lazy">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">Qty: ${item.qty}</div>
            </div>
            <div>$${itemTotal.toFixed(2)}</div>
            `;
            orderItems.appendChild(itemDiv);
        });

        total = subtotal + (total > 50 ? 0 : 10);
        orderShipping.textContent = total > 50 ? 'FREE' : '$10.00';
        orderSubTotal.textContent = `$${subtotal.toFixed(2)}`;
        orderTotal.textContent = `$${total.toFixed(2)}`;
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const orderDetails = {
                firstName: formData.get('first-name'),
                lastName: formData.get('last-name'),
                email: formData.get('email'),
                address: formData.get('address'),
                country: formData.get('country'),
                city: formData.get('city'),
                state: formData.get('state'),
                zip: formData.get('zip'),
                cardNum: formData.get('card-num'),
                cardExp: formData.get('card-exp'),
                items: cart,
                total: total
            };
// Debug log to validate orderDetails before saving
            console.log('Saving orderDetails to localStorage:', orderDetails);

            console.log('Order Details:', orderDetails);
            localStorage.setItem('checkoutData', JSON.stringify(orderDetails));
            localStorage.removeItem('cart'); 

            window.location.href = 'summary.html'; 
        });
    }
    
  });