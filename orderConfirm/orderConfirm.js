var isLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'))
if (isLoggedIn == null || isLoggedIn == false) {
    window.location.replace('/index.html')
}
var orderId = window.location.search.split('=')[1];

$("#order-id").html(orderId)