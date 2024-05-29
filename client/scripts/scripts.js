document.addEventListener('DOMContentLoaded', function () {
    const cartOverlay = document.getElementById("cart-overlay");
    const selectQuanOverlay = document.getElementById("select-quan-overlay");
    const pizzaElements = document.querySelectorAll('.add-selected');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    function onCart(quantity) {
        if (quantity != "0") {
            cartOverlay.classList.add("display");
            cartOverlay.addEventListener("click", offCart);
        } else {
            selectQuanOverlay.classList.add("display");
            selectQuanOverlay.addEventListener("click", offCart);
        }
    }

    function offCart() {
        cartOverlay.classList.remove("display");
        selectQuanOverlay.classList.remove("display");
    }

    function updateCounter(element, value) {
        element.textContent = value;
    }

    function handleQuantityButton(button, increment) {
        const counter = button.closest('.add-selected').querySelector('.counter');
        let currentValue = parseInt(counter.textContent);
        if (increment) {
            if (currentValue < 10) {
                currentValue++;
                updateCounter(counter, currentValue);
            }
        } else {
            if (currentValue > 0) {
                currentValue--;
                updateCounter(counter, currentValue);
            }
        }
    }

    pizzaElements.forEach(function (pizza) {
        const minusBtn = pizza.querySelector('.minusBtn');
        const plusBtn = pizza.querySelector('.plusBtn');

        minusBtn.addEventListener('click', function () {
            handleQuantityButton(this, false);
        });

        plusBtn.addEventListener('click', function () {
            handleQuantityButton(this, true);
        });
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        
        const pizzaContainer = event.target.parentElement;
        const pizzaName = pizzaContainer.querySelector('h4').textContent;
        console.log(pizzaName)
        const pizzaPrice = parseFloat(pizzaContainer.querySelector('h4').textContent.replace(/\D/g, ''));
        const pizzaId = pizzaContainer.dataset.pizzaId;
        const counterVal = parseInt(pizzaContainer.querySelector('.counter').textContent);
        let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

        const existingPizzaIndex = cartItems.findIndex(item => item.name === pizzaName);
        if (existingPizzaIndex !== -1) {
            cartItems[existingPizzaIndex].quantity += counterVal;
        } else {
            cartItems.push({ id: pizzaId, name: pizzaName, price: pizzaPrice, quantity: counterVal });
        }

        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        resetCounter(pizzaContainer);
        updateOrderDetails(cartItems);
        onCart(counterVal);
    }

    function resetCounter(container) {
        container.querySelector('.counter').textContent = '0';
    }

    function updateOrderDetails(cartItems) {
        const orderDetailsContainer = document.getElementById('orderDetails');
        let totalPrice = 0;

        if (orderDetailsContainer) {
            orderDetailsContainer.innerHTML = '';

            cartItems.forEach((item, index) => {
                totalPrice += item.price * item.quantity;
                const itemElement = document.createElement('div');
                itemElement.dataset.itemId = item.id;
                itemElement.dataset.itemQuantity = item.quantity;
                itemElement.classList.add('orderDetails');

                if (item.quantity !== 0) {
                    const itemParagraph = document.createElement('p');
                    itemParagraph.textContent = `${item.name} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity / 100).toFixed(2)}`;
                    itemElement.appendChild(itemParagraph);

                    const removeButton = document.createElement('button');
                    removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
                    removeButton.addEventListener('click', () => removeItem(index));
                    itemElement.appendChild(removeButton);
                }

                orderDetailsContainer.appendChild(itemElement);
            });

            const totalDiv = document.createElement('div');
            const subTotal = totalPrice / 100;
            const total = (totalPrice + totalPrice * 0.09) / 100;
            totalDiv.innerHTML = `Subtotal: $${subTotal.toFixed(2)}<br/>Total: $${total.toFixed(2)}`;
            orderDetailsContainer.appendChild(totalDiv);
        }
    }

    function removeItem(index) {
        let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1);
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateOrderDetails(cartItems);
    }

    updateOrderDetails(JSON.parse(sessionStorage.getItem('cartItems')) || []);
});










// functions to toggle overlay and vertical scroll
function on() {
    // display overlay
    const turnOn = document.getElementById("overlay");
    turnOn.classList.add("fade-in")
    turnOn.style.display = "block";
    // turn off vertical scroll
    const overflow = document.querySelector("body");
    overflow.style.overflow = "hidden";

}

function off() {
    // turn off overlay
    const turnOff = document.getElementById("overlay");
    turnOff.style.display = "none";
    // turn on vertical scroll
    const overflow = document.querySelector("body");
    overflow.style.overflow = "";
}


// change header background on scroll
const nav = document.querySelector("nav");

window.addEventListener("scroll", function () {
    // change background-color on scroll
    if (window.scrollY > 50) {
        // alert("Script is running!");

        nav.classList.add("shrink-nav");
    } else {

        nav.classList.remove("shrink-nav");
    }
});


// // functions to enable and disable add to cart overlay
// let cartOverlay = document.getElementById("cart-overlay");
// let selectQuanOverlay = document.getElementById("select-quan-overlay");
// let body = document.querySelector("body");
// function onCart(quantity) {
//     if (quantity != "0") {
//         cartOverlay.classList.add("display")
//         // disable cart overlay
//         cartOverlay.addEventListener("click", offCart);
//     } else {
//         selectQuanOverlay.classList.add("display");
//         selectQuanOverlay.addEventListener("click", offCart);
//     }

// }

// function offCart() {
//     cartOverlay.classList.remove("display");
//     selectQuanOverlay.classList.remove("display")
// }

// // item add and subtract functionality
// document.addEventListener('DOMContentLoaded', function () {
//     // Get all grid elements
//     const pizzaElements = document.querySelectorAll('.add-selected');

//     // Loop through each grid element
//     pizzaElements.forEach(function (pizza) {
//         // console.log(pizza);
//         const minusBtn = pizza.querySelector('.minusBtn');
//         const plusBtn = pizza.querySelector('.plusBtn');
//         const counter = pizza.querySelector('.counter');

//         minusBtn.addEventListener('click', function () {
//             // Get the current value of the counter
//             let currentValue = parseInt(counter.innerText);

//             // Check if currentValue is greater than 0
//             if (currentValue > 0) {
//                 counter.innerText = currentValue - 1;
//             }
//         });

//         plusBtn.addEventListener('click', function () {
//             // Get the current value of the counter
//             let currentValue = parseInt(counter.innerText);

//             // Check if currentValue is less than 10
//             if (currentValue < 10) {
//                 counter.innerText = currentValue + 1;
//             }
//         });
//     });
// });


// // retrieve order details on order page
// // Wait for the DOM content to be fully loaded before executing the JavaScript code
// document.addEventListener('DOMContentLoaded', function () {
//     // Get all elements with class "add-to-cart"
//     const addToCartButtons = document.querySelectorAll('.add-to-cart');


//     // Loop through each "add to cart" button and attach event listener
//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', addToCart);
//     });

//     // Function to handle adding items to the cart
//     function addToCart(event) {
//         // Get the parent element of the button (which is the pizza container)
//         const pizzaContainer = event.target.parentElement;


//         // Get the pizza name and price from the pizza container
//         const pizzaName = pizzaContainer.querySelector('h4').textContent;
//         const pizzaPrice = parseFloat(pizzaContainer.querySelector('h4').textContent.replace(/\D/g, ''));
//         const pizzaId = pizzaContainer.dataset.pizzaId; // Extract data-pizza-id attribute
//         const counterVal = pizzaContainer.querySelector('.counter').innerText; // get value of counter element

//         // Retrieve the current cart items from localStorage or initialize an empty array
//         let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

//         // Check if the pizza is already in the cart
//         const existingPizzaIndex = cartItems.findIndex(item => item.name === pizzaName);
//         if (existingPizzaIndex !== -1) {
//             // If pizza is already in the cart, increment its quantity
//             cartItems[existingPizzaIndex].quantity += parseInt(counterVal);
//             // console.log(counterVal);
//         } else {
//             // If pizza is not in the cart, add it as a new item
//             cartItems.push({ id: pizzaId, name: pizzaName, price: pizzaPrice, quantity: parseInt(counterVal) });
//         }

//         // Update the cart items in localStorage
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));

//         // Reset the counter for the clicked pizza to 0
//         const counter = pizzaContainer.querySelector('.counter');
//         counter.textContent = '0';

//         // Update the order details on the order page
//         updateOrderDetails(cartItems);

//         // enable cart overlay

//         console.log(counterVal);
//         onCart(counterVal);


//     }

//     // Function to update the order details on the order page
//     function updateOrderDetails(cartItems) {
//         // Get the order details container on the order page
//         const orderDetailsContainer = document.getElementById('orderDetails');

//         // Initialize total price variable
//         let totalPrice = 0;

//         // Check if the order details container exists
//         if (orderDetailsContainer) {
//             // Clear any existing content inside the order details container
//             orderDetailsContainer.innerHTML = '';

//             // Loop through each cart item and add it to the order details
//             cartItems.forEach((item, index) => {
//                 console.log(item.quantity);
//                 // Add item's price to total price
//                 totalPrice += item.price * item.quantity;
//                 // Create a div to hold the item details and set its data attributes
//                 const itemElement = document.createElement('div');
//                 itemElement.dataset.itemId = item.id;
//                 itemElement.dataset.itemQuantity = item.quantity;
//                 itemElement.style.display = 'flex';

//                 // test if the selected quantity is not 0
//                 if (item.quantity !== 0) {
//                     // Create a paragraph element to display item details
//                     const itemParagraph = document.createElement('p');
//                     itemParagraph.textContent = `${item.name} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity / 100).toFixed(2)}`;
//                     itemElement.appendChild(itemParagraph);
//                     // Add a remove button for each item
//                     const removeButton = document.createElement('button');
//                     removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
//                     removeButton.addEventListener('click', () => removeItem(index));
//                     itemElement.appendChild(removeButton);
//                 }

//                 orderDetailsContainer.appendChild(itemElement);

//             });



//             // Create a new div for displaying total price
//             const totalDiv = document.createElement('div');

//             // Calculate the subtotal and total prices
//             const subTotal = totalPrice / 100;
//             const total = (totalPrice + totalPrice * 0.09) / 100;

//             // Set the content of the total div to display the total price
//             totalDiv.innerHTML = `Subtotal: $${subTotal.toFixed(2)}<br/>Total: $${total.toFixed(2)} `;

//             // Append the total div to the order details
//             orderDetails.appendChild(totalDiv);

//         }
//     }

//     // Function to remove an item from the cart
//     function removeItem(index) {
//         // Retrieve the current cart items from localStorage
//         let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

//         // Remove the item at the specified index
//         cartItems.splice(index, 1);

//         // Update the cart items in localStorage
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));

//         // Update the order details on the order page
//         updateOrderDetails(cartItems);
//     }

//     // Call the updateOrderDetails function when the order page loads to display existing cart items
//     updateOrderDetails(JSON.parse(localStorage.getItem('cartItems')) || []);


// });