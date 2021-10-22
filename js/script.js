function slider() {

    var swiper = new Swiper('.js-product-slider', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar"
        },
        lazy: true,
        breakpoints: {
            350: {
                slidesPerView: 1,
            },
            425: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1300: {
                slidesPerView: 3,
            }
        },
        slidesPerView: 1
    });
};

function myFunction(p = 'Size Özel', p2 = '0') {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/product-list.json', true);
    xhr.onload = function() {
        console.log(this.status);
        var sayac = 0;
        if (this.status === 200) {

            let product = JSON.parse(this.responseText);

            let html = "";

            for (let i = 0; i < product.responses[0][0].params.userCategories.length; i++) {

                var Categories;

                let userCategories = product.responses[0][0].params.userCategories[i];

                var sonuc = userCategories.indexOf(">");

                if (sonuc == -1) {
                    Categories = userCategories;
                } else {
                    Categories = userCategories.split(" > ")[1];
                }

                html += `<button class="nav-link" onclick="myFunction('${userCategories}','${i}')" data-id="${i}" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">${Categories}</button>`;

                document.querySelector('#nav-tab').innerHTML = html;
                sayac++;

            }

            var s = document.getElementsByClassName("nav-link");
            var x = document.getElementsByClassName("nav-link")[p2].getAttribute("data-id");

            for (var i = 0; i < sayac; i++) {
                if (p2 == i) {
                    s[i].className += " bg-light text-primary rounded p-1 ";
                }
            }



            html = "";
            for (let i = 0; i < product.responses[0][0].params.recommendedProducts[p].length; i++) {

                html += `
                <div class="swiper-slide" style="width:280px;">
                <article>
                <a class='product-link' href=${product.responses[0][0].params.recommendedProducts[p][i].url} target="_blank"> 
                  <div class="product-card">
                    <div class="product-card-img swiper-lazy">
                      <img src= "${product.responses[0][0].params.recommendedProducts[p][i].image}" alt=""
                        class="img-fluid"/>
                    </div>
                    <div class="product-title">
                   <h2>${product.responses[0][0].params.recommendedProducts[p][i].name}</h2>
                    </div>
                    <div class="product-price">
                    <p>${product.responses[0][0].params.recommendedProducts[p][i].price} TL</p>
                    </div>
                    <div class="product-cargo">
                      <div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#36b458" class='cargo-ico'>
                          <path
                            d="M23.808 9.733L21.552 6.6A1.421 1.421 0 0020.4 6h-4.08V4.5c0-.828-.645-1.5-1.44-1.5H1.44C.645 3 0 3.672 0 4.5v12c0 .828.645 1.5 1.44 1.5h1.44c0 1.657 1.29 3 2.88 3 1.59 0 2.88-1.343 2.88-3h5.76c0 1.657 1.29 3 2.88 3 1.59 0 2.88-1.343 2.88-3h1.92c1.06 0 1.92-.895 1.92-2v-5.667c0-.216-.067-.427-.192-.6zM5.76 20c-1.06 0-1.92-.895-1.92-2s.86-2 1.92-2 1.92.895 1.92 2c-.001 1.104-.86 1.999-1.92 2zm11.52 0c-1.06 0-1.92-.895-1.92-2s.86-2 1.92-2 1.92.895 1.92 2c-.001 1.104-.86 1.999-1.92 2zm5.76-9h-6.72V7h4.08c.15 0 .293.075.384.2l2.256 3.133V11z">
                          </path>
                        </svg>
                      </div>
                      <span>Ücretsiz Kargo</span>
                    </div>
                    </a>
                     <div class='add-button'>
                    <button class='btn btn-primary button' onClick='show()'>Sepete Ekle</button>
                     </div>
                    </div>
                </article>
              </div> `;

                document.querySelector('#first-nav').innerHTML = html;

            }
            slider();

            function freecargo() {

                let cargo = product.responses[0][0].params;

                for (let i = 0; i < product.responses[0][0].params.recommendedProducts[p].length; i++) {

                    if (cargo.recommendedProducts[p][i].params.shippingFee == "NON-FREE") {
                        document.querySelector(".product-cargo").style.visibility = 'hidden';
                    }

                }

            }
            freecargo();
        }

    }
    xhr.send();
}

function show() {
    document.querySelector(".popup").style.visibility = 'visible';

    setTimeout(() => {
        document.querySelector(".popup").style.opacity = 0.1;
    }, 1500)
    document.querySelector(".popup").style.opacity = 1;

    setTimeout(() => {
        document.querySelector(".popup").style.visibility = 'hidden';
    }, 1400)
}

function close() {
    document.querySelector(".popup").style.visibility = 'hidden';
}