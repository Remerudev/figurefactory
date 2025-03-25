document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();

    // Add event listener for phone number input
    var phoneNumberInput = document.getElementById('phone');
    phoneNumberInput.addEventListener('input', function(event) {
        // Remove any non-numeric characters
        var inputValue = event.target.value.replace(/\D/g, '');
        // Update the input field value
        event.target.value = inputValue;
    });
});

function loadCartItems() {
    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);
        var checkoutItemsContainer = document.getElementById('checkout-items');
        var totalPrice = 0;

        // Clear the container first
        checkoutItemsContainer.innerHTML = '';

        // Loop through cart items
        cartItems.forEach(function(item) {
            // Create HTML elements for each cart item
            var itemElement = document.createElement('div');
            itemElement.classList.add('cart-box');
            var itemContent = `
                <img src="${item.productImg}" alt="" class="cart-img" />
                <div class="detail-box">
                    <div class="cart-product-title">${item.title}</div> 
                    <div class="cart-price">${item.price}</div>
                    <div class="cart-quantity">${item.quantity}</div>
                </div>`;
            itemElement.innerHTML = itemContent;

            // Add the item to the checkout items container
            checkoutItemsContainer.appendChild(itemElement);

            // Calculate total price
            totalPrice += parseFloat(item.price.replace('₱', '')) * parseInt(item.quantity);
        });

        // Display total price
        document.querySelector('.total-price').innerText = '₱' + totalPrice.toFixed(2);
    }
}
