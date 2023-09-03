var isLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'))
if (isLoggedIn == null || isLoggedIn == false) {
    window.location.replace('/index.html')
}



var orderId = window.location.search.split('=')[1];
var orderIndex = orderId - 100001


var orderList = JSON.parse(localStorage.getItem('orders')) || [];

var cartList = orderList[orderIndex].products
totalAmount = orderList[orderIndex].amount
totalItems = orderList[orderIndex].items

for (var i = 0; i < cartList.length; i++) {
    $('#card-list').append(createCheckoutCard(cartList[i], i))


}
$('#main-heading').html(`Order Details. ID #<span>${orderId}</span>`)
$('#item-count').html(totalItems);
$('#total-amount').html(totalAmount);

function createCheckoutCard(cartObj, i) {
    var card = document.createElement('div');
    card.classList.add('checkout-card');

    card.innerHTML += `
    <div>
        <img class="checkout-product-img" src="${cartObj.preview}" />
    </div>
    <div>
        <h4>${cartObj.name}</h4>
        <div class="qty-wrapper">
            <p>Qty : ${cartObj.quantity}</p>
        </div>
        <p class = "price" >Price : <span>₹ ${cartObj.price}</span></p>
        <p class = "price" >Subtotal ( ${cartObj.quantity} items ): <span>₹ ${cartObj.price * cartObj.quantity}</span></p>
    </div>
    `;

    return card;
}