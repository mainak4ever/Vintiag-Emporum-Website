$(document).ready(function () {
    var isLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'))
    if (isLoggedIn == null || isLoggedIn == false) {
        window.location.replace('/index.html')
    } else {
        const user = JSON.parse(localStorage.getItem("profile"));
        displayUserDetails(user)

        // Function to display user details
        function displayUserDetails(user) {
            const userDetailsContainer = $("#userDetails");
            userDetailsContainer.html("");

            const userHtml = `
            <h2>Name: ${user.firstName} ${user.lastName}</h2>
            <p>Email: ${user.email}</p>
            <p>Phone Number: ${user.phoneNumber}</p>
            <p>Password :${user.password}</p>
        `;

            userDetailsContainer.html(userHtml);
        }
    }
});