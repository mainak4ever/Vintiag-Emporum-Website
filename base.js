// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
    var isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    // Dropdown functionality for the user
    const userDropdownButton = document.getElementById("userDropdownButton");
    const userDropdown = document.getElementById("userDropdown");

    userDropdownButton.addEventListener("mouseenter", function () {
        userDropdown.style.display = "block";
    });

    userDropdownButton.addEventListener("mouseleave", function () {
        userDropdown.style.display = "none";
    });

    userDropdown.addEventListener("mouseenter", function () {
        userDropdown.style.display = "block";
    });

    userDropdown.addEventListener("mouseleave", function () {
        userDropdown.style.display = "none";
    });

    // Burger menu dropdown
    const burgerMenu = document.getElementById('burger-menu');
    const menu = document.getElementById('menu');

    burgerMenu.addEventListener('click', () => {
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });

    // Check cart items and update the cart count
    let totalCount = 0;
    const cartList = JSON.parse(localStorage.getItem("cart")) || [];
    checkCartItems();

    function checkCartItems() {
        for (let i = 0; i < cartList.length; i++) {
            totalCount += cartList[i].quantity || 0;
        }
        const cartCountElement = document.getElementById('cart-count');
        if (isLoggedIn == null || isLoggedIn == false) {
            cartCountElement.textContent = `(0)`;
        } else {
            if (cartCountElement) {
                cartCountElement.textContent = `(${totalCount})`;
            }
        }

    }


    checkForLogin();

    function checkForLogin() {
        if (isLoggedIn == null) {
            disableHref();
            $('#login-btn').html('Sign Up');
        } else if (isLoggedIn == false) {
            disableHref();
            $('#login-btn').html('Log In');
        } else {
            enableHref();
            $('#login-btn').html('Log Out');
        }
    }

    function disableHref() {
        $('#cart-link').attr('href', "");
        $('#orders-link').attr('href', "");
        $("#profile-link").attr('href', "");
    }

    function enableHref() {
        $('#cart-link').attr('href', "/checkout/checkout.html");
        $('#orders-link').attr('href', "/odersList/ordersList.html");
        $("#profile-link").attr('href', "/profile/profile.html");
    }

    $('#login-btn').on('click', function () {
        if (isLoggedIn == null) {
            location.href = "/signUp/signUp.html"; // Navigate to the sign-up page
        } else if (isLoggedIn == false) {
            var email = prompt("Enter Your Email");
            var pass = prompt("Enter your Password");
            var profile = JSON.parse(localStorage.getItem('profile'))
            if (profile.email == email && profile.password == pass) {
                localStorage.setItem('isLoggedIn', JSON.stringify(true));
                alert('Logged In Successfully ')
            } else {
                alert('Wrong Email or Password')
            }
            location.href = "/index.html";
        } else {
            localStorage.setItem('isLoggedIn', JSON.stringify(false));
            location.href = "/index.html";
        }
    });

    $('#cart-link').on('click', function () {
        if (isLoggedIn == null || isLoggedIn == false) {
            alert("Log In to access Cart");
            // return false
        }
    });

    $('#orders-link').on('click', function () {
        if (isLoggedIn == null || isLoggedIn == false) {
            alert("Log In to access Orders");
            // return false;
        }
    });
});