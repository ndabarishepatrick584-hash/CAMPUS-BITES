let cart = [];
let total = 0;

function addToCart(item, price){
    cart.push({item, price});
    total += price;
    updateCart();
}

function updateCart(){
    const cartList = document.getElementById('cartItems');
    cartList.innerHTML = "";
    if(cart.length === 0) cartList.innerHTML = "<li>Cart is empty</li>";
    cart.forEach(i => {
        cartList.innerHTML += `<li>${i.item} - KES ${i.price}</li>`;
    });
    document.getElementById('total').innerText = total;
    document.getElementById('payAmount').innerText = total;
}

function placeOrder(){
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const mpesaCode = document.getElementById('mpesaCode').value;
    const campus = document.getElementById('campus').value;
    const location = document.getElementById('location').value;
    
    if(!name || !phone || !mpesaCode || !campus || !location) return alert("Fill all details including M-PESA code");
    if(cart.length === 0) return alert("Add items to cart first");
    
    const orderDetails = `NEW PAID ORDER\n${cart.map(i => `- ${i.item}: KES ${i.price}`).join('\n')}\n\nTOTAL: KES ${total}\n\nName: ${name}\nPhone: ${phone}\nM-PESA Code: ${mpesaCode}\nCampus: ${campus}\nLocation: ${location}`;
    
    // Sends to YOUR WhatsApp
    window.open(`https://wa.me/2547XXXXXXXXXX?text=${encodeURIComponent(orderDetails)}`);
    
    document.getElementById('status').innerText = "Order received! We are verifying your payment. You will get confirmation on WhatsApp in 5 minutes.";
    cart = []; total = 0; updateCart();
}