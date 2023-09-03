var isLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'))
if (isLoggedIn == null || isLoggedIn == false) {
    window.location.replace('/index.html')
}

var cartList = JSON.parse(localStorage.getItem('cart')) || [];

var totalAmount = 0;
var totalItems = 0;

for (var i = 0; i < cartList.length; i++) {
    $('#card-list').append(createCheckoutCard(cartList[i], i))

    totalAmount += (cartList[i].price * cartList[i].quantity)
    totalItems += cartList[i].quantity
}

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
            <button class='qty-btn' onclick="decreaseQty(${i})">-</button>
            <p>${cartObj.quantity}</p>
            <button class='qty-btn' onclick="increaseQty(${i})">+</button>
        </div>
        <p class = "price" >Price : <span>₹ ${cartObj.price}</span></p>
        <p class = "price" >Subtotal ( ${cartObj.quantity} items ): <span>₹ ${cartObj.price * cartObj.quantity}</span></p>
    </div>
    `;

    return card;
}

function decreaseQty(i) {
    if (cartList[i].quantity == 1) {
        cartList.splice(i, 1);
    } else {
        cartList[i].quantity -= 1;

    }
    localStorage.setItem('cart', JSON.stringify(cartList));
    location.reload();
}

function increaseQty(i) {
    cartList[i].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cartList));
    location.reload();
}
$('#btn-place-order').click(function () {
    if (isLoggedIn == null || isLoggedIn == false) {
        alert("Log In to place order")
    } else {
        var orderItems = []
        console.log(cartList)
        for (var i = 0; i < cartList.length; ++i) {
            // console.log(cartList[i])
            var obj = {
                "id": cartList[i].id,
                "brand": cartList[i].brand,
                "name": cartList[i].name,
                "price": cartList[i].price,
                "preview": cartList[i].preview,
                "isAccessory": cartList[i].isAccessory,
                "quantity": cartList[i].quantity
            }
            orderItems.push(obj);
        }
        var orderList = JSON.parse(localStorage.getItem('orders')) || [];
        var orderId

        if (orderList.length == 0) {
            orderId = 100001;
        } else {
            orderId = parseInt(orderList[orderList.length - 1].id) + 1
        }

        var orderObj = {
            id: orderId,
            amount: totalAmount,
            items: totalItems,
            products: orderItems

        }
        orderList.push(orderObj)
        localStorage.setItem('orders', JSON.stringify(orderList))

        // $.post('https://5d76bf96515d1a0014085cf9.mockapi.io/order', orderObj, function () {
        //     localStorage.setItem('cart', []);
        //     alert('Order Placed Successfully')

        //     location.assign('./thankyou.html');
        // })

        try {
            $.ajax({
                type: 'POST',
                url: 'https://5d76bf96515d1a0014085cf9.mockapi.io/order',
                data: JSON.stringify(orderObj),
                contentType: 'application/json',
                success: function (response) {
                    // Handle the success response here
                    console.log('Success:', response);
                },
                error: function (xhr, status, error) {
                    // Handle the error here
                    console.log('Error:', xhr.responseText);
                    throw new Error('POST request failed'); // Throw an error to trigger the catch block
                }
            });
        } catch (e) {
            // Handle exceptions here
            console.error('Exception:', e);
        } finally {
            localStorage.removeItem('cart');
            alert('Order Placed Successfully')

            location.assign('/orderConfirm/orderConfirm.html?p=' + orderId);
        }
    }
})