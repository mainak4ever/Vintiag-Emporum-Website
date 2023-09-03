$(document).ready(function () {

    // code for Banner implementation
    const owl = $('.banner').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        nav: false,
    });

    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    leftBtn.addEventListener('click', function () {
        owl.trigger('prev.owl.carousel');
    });

    rightBtn.addEventListener('click', function () {
        owl.trigger('next.owl.carousel');
    });

    //  create preview cards
    var productList
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function (response) {
        productList = response;
        // console.log(productList)
        createItemCard();
    });

    var clothingCards = document.getElementById("clothingCards");
    var accessoriesCards = document.getElementById("accessoriesCards");




    function createItemCard() {
        for (var i = 0; i < productList.length; i++) {
            var obj = productList[i]
            if (productList[i].isAccessory === false) {
                clothingCards.innerHTML += `
                    <div class="card" id="${obj.id}">
                        <a href="/product/details.html?p=${obj.id}">
                            <div class="preview-img">
                                <img src="${obj.preview}"
                                    alt="Image${obj.id}">
                            </div>
                            <div class="preview-details">
                                <h3>${obj.name}</h3>
                                <h4>${obj.brand}</h4>
                                <h5>Rs ${obj.price}</h5>
                            </div>
                        </a>
                    </div>
                    `

            } else {
                accessoriesCards.innerHTML += `
                    <div class="card" id="${obj.id}">
                        <a href="/product/details.html?p=${obj.id}">
                            <div class="preview-img">
                                <img src="${obj.preview}" alt="Image${obj.id}">
                            </div>
                            <div class="preview-details">
                                <h3>${obj.name}</h3>
                                <h4>${obj.brand}</h4>
                                <h5>Rs ${obj.price}</h5>
                            </div>
                        </a>
                    </div>
                    `
            }
        }
    }



});

// 