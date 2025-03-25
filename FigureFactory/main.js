let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
// add on cart
cartIcon.onclick = () => {
    cart.classList.add("active");
}
// remove cart
closeCart.onclick = () => {
    cart.classList.remove("active");
}
// cart working
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else{
    ready();
}

function ready() {
    // remove item on cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i< removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // quantity change
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i< quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
  }
  // add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i< addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  loadCartItems();
}

// remove cart item
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    saveCartItems();
}
// quantity change function
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartItems();
    updateCartIcon();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByTagName('img')[0].src;
    
    // check if the product is sold out
    if (price === "Out of Stock") {
        alert("Sorry this product is Out of Stock");
        return;
    }

    // if the product is not sold out proceed to add it to the cart
    addProductToCart(title, price, productImg);
    updatetotal();
    saveCartItems();
    updateCartIcon();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('You have already added this item to cart');
            return;
        }
    }
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img" />
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input 
                type="number" 
                name="" 
                id="" 
                value="1" 
                class="cart-quantity"
            />
        </div>
        <i class="bx bx-trash-alt cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0]
               .addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0]
               .addEventListener('change', quantityChanged);
                saveCartItems();
                updateCartIcon();
}

// total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    if (cartBoxes.length === 0) {
        total = 0;
    } else {
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.getElementsByClassName('cart-price')[0];
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            var price = parseFloat(priceElement.innerText.replace('₱', ''))
            var quantity = quantityElement.value;
            total += price * quantity;
        }
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = '₱' + total;
    // save total to localstorage
    localStorage.setItem('cartTotal', total);
}


// keep item in cart when reload the page 
function saveCartItems() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cartItems = [];
    for (var i = 0; i < cartBoxes.length; i++) {
        cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
// load cart
function loadCartItems() {
    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName('cart-box');
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.querySelector('.cart-quantity');
            quantityElement.value = item.quantity;
        }
    }

    var cartTotal = localStorage.getItem('cartTotal');
    if (cartTotal) {
        document.querySelector('.total-price').innerText = "₱" + cartTotal;
    }
    updateCartIcon();
}

// Quantity in cart 
function updateCartIcon() {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var quantity = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        quantity += parseInt(quantityElement.value);
    }

    var cartIcon = document.querySelector('#cart-icon');

    
    if (quantity === 0) {
        cartIcon.removeAttribute('data-quantity');
    } else {
        cartIcon.setAttribute('data-quantity', quantity);
    }
}

// remove cart item
function removeCartItem(event){
    var buttonClicked = event.target;
    var cartItem = buttonClicked.parentElement;
    cartItem.remove();
    updatetotal();
    saveCartItems();
    updateCartIcon();
}

// category

function filterProducts(category) {
    var products = document.querySelectorAll('.product-box');

    products.forEach(function(product) {
        if (category === 'all') {
            product.style.display = 'block';
        } else if (category === 'top-sales') {
            var isTopSeller = product.getAttribute('data-topSeller') === 'true';
            if (isTopSeller) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        } else if (product.getAttribute('data-category') === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// modal box

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('productModal');
    var span = document.getElementsByClassName('close')[0];
  
    var productBoxes = document.querySelectorAll('.product-box');
    productBoxes.forEach(function(box) {
      box.addEventListener('click', function(event) {
        if (!event.target.classList.contains('add-cart')) {
          modal.style.display = 'block';
          var productImg = this.querySelector('img').src;
          var productTitle = this.querySelector('.product-title').textContent;
          var productDescription = this.querySelector('.product-description').textContent; // Get the textContent instead of the data-description attribute
          var productPrice = this.querySelector('.price').textContent;
          document.getElementById('modalImg').src = productImg;
          document.getElementById('modalTitle').innerText = productTitle;
          document.getElementById('modalDescription').innerText = productDescription; // Use innerText instead of innerHTML
          document.getElementById('modalPrice').innerText = productPrice;
  
          // Remove the 'hidden' class from the product description
          document.getElementById('modalDescription').classList.remove('hidden');
        }
      });
    });
  
    span.onclick = function() {
      modal.style.display = 'none';
    };
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  });


