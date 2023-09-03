var isLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'))
if (isLoggedIn == null || isLoggedIn == false) {
    window.location.replace('/index.html')
}

var orderList = JSON.parse(localStorage.getItem('orders')) || [];

for (var i = orderList.length - 1; i >= 0; i--) {
    $('#card-list').append(createOrderCard(orderList[i], i))
}


function createOrderCard(orderObj, i) {
    return `
    <a onclick = "goToOrder(${orderObj.id})">
                            <div class="checkout-card">
                                <div>
                                    <img class="checkout-product-img" src="${orderObj.products[0].preview}" />
                                </div>
                                <div>
                                    <h2 class="order-id">Order Id: #<span>${orderObj.id}</span></h2>
                                    <h3 class="section-heading">Total Items : <span id="item-count">${orderObj.items}</span></h3>
                                    <p class="section-heading">Total Amount : <span id='currency'>₹</span>
                                        <span id="total-amount">${orderObj.amount}</span>
                                    </p>
                                </div>
                            </div>
                        </a>
    `
}

function goToOrder(id) {
    window.location.href = "/orders/order.html?p=" + id;
}