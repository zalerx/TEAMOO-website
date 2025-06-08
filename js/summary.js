document.addEventListener('DOMContentLoaded', () => {
    const formData = JSON.parse(localStorage.getItem('checkoutData')) || {};
    const orderDate = document.querySelector('.order-date');

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
        weekday: 'short',  // "Fri"
        day: '2-digit',    // "18"
        month: 'short',    // "Apr"
        year: 'numeric',   // "2025"
    });

    if (orderDate) {
        orderDate.textContent = formattedDate;
        console.log('Order Date:', formattedDate);
    }
// Debug logs to validate localStorage data
    console.log('Loaded formData from localStorage:', formData);
    console.log('formData.firstName:', formData.firstName);

    if (!formData) {
        console.error('No form data found in localStorage.');
        return;
    }

    const firstNames = document.querySelectorAll('.first-name');
    if (firstNames.length > 0) firstNames[0].textContent = formData.firstName || 'N/A';
    if (firstNames.length > 1) firstNames[1].textContent = formData.firstName || 'N/A';


    const lastName = document.querySelector('.last-name');
    const email = document.querySelector('.email');
    const address = document.querySelector('.address');
    const country = document.querySelector('.country');
    const city = document.querySelector('.city');
    const state = document.querySelector('.state');
    const zip = document.querySelector('.zip');
    const orderItems = document.querySelector('.summary-items');
    const orderTotal = document.querySelector('.order-total');
    const orderSubTotal = document.querySelector('.subtotal');
    const orderShipping = document.querySelector('.shipping');

});