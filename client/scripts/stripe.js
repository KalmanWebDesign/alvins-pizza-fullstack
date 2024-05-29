// Get the form element
const form = document.querySelector('form');

// Add event listener for form submission
form.addEventListener('submit', function (event) {

    event.preventDefault();
    // stripe integration

    console.log("stripe")

    // Retrieve selected items and quantities from the order details div
    const selectedItems = [];
    const orderDetails = document.querySelectorAll("[data-item-id][data-item-quantity]");
    orderDetails.forEach(detail => {
        const id = detail.dataset.itemId;
        const quantity = detail.dataset.itemQuantity;
        selectedItems.push({ id: parseInt(id), quantity: parseInt(quantity) });
    });

    fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: selectedItems,
        }),
    })
        .then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        })
        .then(({ url }) => {
            window.location = url;
            
        })
        .catch(e => {
            console.error(e.error)
        })

});
