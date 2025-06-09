document.addEventListener('DOMContentLoaded', () => {
    const formData = JSON.parse(localStorage.getItem('checkoutData')) || {};
    const orderDate = document.querySelector('.order-date');

    // Set user greeting
    const userGreeting = document.querySelector('.user');
    if (userGreeting) {
        userGreeting.textContent = formData.firstName ? formData.firstName : 'Customer';
    }

    // Set order date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    if (orderDate) {
        orderDate.textContent = formattedDate;
    }

    // Set order number (generate if not present)
    const orderNumberSpan = document.querySelector('.order-number');
    if (orderNumberSpan) {
        if (formData.orderNumber) {
            orderNumberSpan.textContent = formData.orderNumber;
        } else {
            // Generate a random order number and store it for this session
            let generatedOrderNumber = sessionStorage.getItem('orderNumber');
            if (!generatedOrderNumber) {
                generatedOrderNumber = 'V' + Math.random().toString(36).substr(2, 9).toUpperCase();
                sessionStorage.setItem('orderNumber', generatedOrderNumber);
            }
            orderNumberSpan.textContent = generatedOrderNumber;
        }
    }

    // Fill in user details
    const firstNames = document.querySelectorAll('.first-name');
    if (firstNames.length > 0) firstNames[0].textContent = formData.firstName || 'N/A';
    if (firstNames.length > 1) firstNames[1].textContent = formData.firstName || 'N/A';

    const lastNames = document.querySelectorAll('.last-name');
    if (lastNames.length > 0) lastNames[0].textContent = formData.lastName || 'N/A';
    if (lastNames.length > 1) lastNames[1].textContent = formData.lastName || 'N/A';

    // Shipping address
    const addresses = document.querySelectorAll('.address');
    if (addresses.length > 0) addresses[0].textContent = formData.address || 'N/A';
    // Billing address
    if (addresses.length > 1) addresses[1].textContent = formData.billingAddress || 'N/A';

    // Shipping city
    const cities = document.querySelectorAll('.city');
    if (cities.length > 0) cities[0].textContent = formData.city || 'N/A';
    // Billing city
    if (cities.length > 1) cities[1].textContent = formData.billingCity || 'N/A';

    // Shipping state
    const states = document.querySelectorAll('.state');
    if (states.length > 0) states[0].textContent = formData.state || 'N/A';
    // Billing state
    if (states.length > 1) states[1].textContent = formData.billingState || 'N/A';

    // Shipping zip
    const zips = document.querySelectorAll('.zip');
    if (zips.length > 0) zips[0].textContent = formData.zip || 'N/A';
    // Billing zip
    if (zips.length > 1) zips[1].textContent = formData.billingZip || 'N/A';

    // Shipping first/last name already handled above
    // Billing first/last name
    if (firstNames.length > 1) firstNames[1].textContent = formData.billingFirstName || 'N/A';
    if (lastNames.length > 1) lastNames[1].textContent = formData.billingLastName || 'N/A';

    // Fill in payment method details
    const cardNum = document.querySelector(".card-number");
    if (cardNum) {
        if (formData.cardNum) {
            // Mask all but last 4 digits
            const num = formData.cardNum.toString();
            cardNum.textContent = num.length > 4 ? '**** **** **** ' + num.slice(-4) : num;
        } else {
            cardNum.textContent = 'N/A';
        }
    }

    const expDate = document.querySelector('.exp-date');
    if (expDate) {
        expDate.textContent = formData.expiry || 'N/A';
    }

    const paymentMethodName = document.querySelector('.payment-method-name');
    if (paymentMethodName) {
        paymentMethodName.textContent = formData.paymentMethod || 'Card';
    }

    // Fill in order items and totals
    const orderItems = document.querySelector('.summary-items');
    const orderTotal = document.querySelector('.total');
    const orderSubTotal = document.querySelector('.subtotal');
    const orderShipping = document.querySelector('.shipping');

    let subtotal = 0;
    let total = 0;

    if (orderItems && Array.isArray(formData.items) && formData.items.length > 0) {
        formData.items.forEach(item => {
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

        total = subtotal + (subtotal > 50 ? 0 : 10);
        orderShipping.textContent = subtotal > 50 ? 'FREE' : '$10.00';
        orderSubTotal.textContent = `$${subtotal.toFixed(2)}`;
        orderTotal.textContent = `$${total.toFixed(2)}`;
    } else {
        orderItems.innerHTML = '<div>No items in this order.</div>';
        orderShipping.textContent = '$0.00';
        orderSubTotal.textContent = '$0.00';
        orderTotal.textContent = '$0.00';
    }
});