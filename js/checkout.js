  document.addEventListener('DOMContentLoaded', () => {
    const orderItems = document.querySelector('.summary-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderTotal = document.querySelector('.order-total');
    const orderSubTotal = document.querySelector('.subtotal');
    const orderShipping = document.querySelector('.shipping');
    const form = document.querySelector('form[name="checkout-form"]');
    const sameBillingCheckbox = document.getElementById('same-billing');
    const billingSection = document.getElementById('billing-address-section');

    // Show/hide billing address section based on checkbox
    if (sameBillingCheckbox && billingSection) {
        const toggleBillingSection = () => {
            billingSection.style.display = sameBillingCheckbox.checked ? 'none' : 'block';
        };
        sameBillingCheckbox.addEventListener('change', toggleBillingSection);
        // Set initial state
        toggleBillingSection();
    }

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

            // Shipping address
            const shipping = {
                firstName: formData.get('first-name'),
                lastName: formData.get('last-name'),
                address: formData.get('address'),
                country: formData.get('country'),
                city: formData.get('city'),
                state: formData.get('state'),
                zip: formData.get('zip'),
                phone: formData.get('phone')
            };

            // Billing address
            let billing;
            if (sameBillingCheckbox && sameBillingCheckbox.checked) {
                billing = { ...shipping };
            } else {
                billing = {
                    firstName: formData.get('billing-first-name'),
                    lastName: formData.get('billing-last-name'),
                    address: formData.get('billing-address'),
                    country: formData.get('billing-country'),
                    city: formData.get('billing-city'),
                    state: formData.get('billing-state'),
                    zip: formData.get('billing-zip'),
                    phone: formData.get('billing-phone')
                };
            }

            const orderDetails = {
                firstName: shipping.firstName,
                lastName: shipping.lastName,
                email: formData.get('email'),
                address: shipping.address,
                country: shipping.country,
                city: shipping.city,
                state: shipping.state,
                zip: shipping.zip,
                phone: shipping.phone,
                billingFirstName: billing.firstName,
                billingLastName: billing.lastName,
                billingAddress: billing.address,
                billingCountry: billing.country,
                billingCity: billing.city,
                billingState: billing.state,
                billingZip: billing.zip,
                billingPhone: billing.phone,
                cardNum: formData.get('card-num'),
                expiry: formData.get('card-exp'),
                items: cart,
                total: total
            };

            console.log('Order Details:', orderDetails);
            localStorage.setItem('checkoutData', JSON.stringify(orderDetails));
            localStorage.removeItem('cart');

            window.location.href = 'summary.html';
        });
    }
    
  });