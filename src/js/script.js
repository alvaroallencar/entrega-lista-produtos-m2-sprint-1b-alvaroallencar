
// Função que inicia a lógica e chama as outras funções:

function general(products) {

    search(products);

    createProductCard(products);

    totalPrice(products);

    addingEventListenersToHeaderButtons(products);

}

function search(productsList) {

    let searchButton = document.querySelector(".search-button");

    let allProductsButton = document.querySelector(".all-products");
    allProductsButton.classList.add("selected");

    searchButton.addEventListener("click", (event) => {

        event.preventDefault();

        allProductsButton.classList.add("selected");

        let hortifruitButton = document.querySelector(".hortifruit");
        hortifruitButton.classList.remove("selected");

        let bakeryButton = document.querySelector(".bakery");
        bakeryButton.classList.remove("selected");

        let dairyButton = document.querySelector(".dairy");
        dairyButton.classList.remove("selected");


        let searchInput = document.querySelector(".search-input");

        let searchInputValue = searchInput.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let filteredSearch = [];

        productsList.forEach((product) => {

            if ((product.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchInputValue) === true) ||
                (product.nome.toLowerCase().includes(searchInputValue) === true)) {

                filteredSearch.push(product);

            }

        });

        createProductCard(filteredSearch);

        totalPrice(filteredSearch);

    });

}

function addingEventListenersToHeaderButtons(productsList) {

    filteringAllProducts(productsList);

    filteringHortifruitProducts(productsList);

    filteringBakeryProducts(productsList);

    filteringDairyProducts(productsList);

}

function filteringAllProducts(productsList) {

    let allProductsButton = document.querySelector(".all-products");

    allProductsButton.addEventListener("click", () => {

        allProductsButton.classList.add("selected");

        let hortifruitButton = document.querySelector(".hortifruit");
        hortifruitButton.classList.remove("selected");

        let bakeryButton = document.querySelector(".bakery");
        bakeryButton.classList.remove("selected");

        let dairyButton = document.querySelector(".dairy");
        dairyButton.classList.remove("selected");

        createProductCard(productsList);

        totalPrice(productsList);

    });

}

function filteringHortifruitProducts(productsList) {

    let hortifruitButton = document.querySelector(".hortifruit");

    hortifruitButton.addEventListener("click", () => {

        hortifruitButton.classList.add("selected");

        let allProductsButton = document.querySelector(".all-products");
        allProductsButton.classList.remove("selected");

        let bakeryButton = document.querySelector(".bakery");
        bakeryButton.classList.remove("selected");

        let dairyButton = document.querySelector(".dairy");
        dairyButton.classList.remove("selected");

        let filteredHortifruitProducts = [];

        productsList.forEach((product) => {

            if (product.secao === "Hortifruti") {

                filteredHortifruitProducts.push(product);

            }

        });

        createProductCard(filteredHortifruitProducts);

        totalPrice(filteredHortifruitProducts);

    });

}

function filteringBakeryProducts(productsList) {

    let bakeryButton = document.querySelector(".bakery");

    bakeryButton.addEventListener("click", () => {

        bakeryButton.classList.add("selected");

        let allProductsButton = document.querySelector(".all-products");
        allProductsButton.classList.remove("selected");

        let hortifruitButton = document.querySelector(".hortifruit");
        hortifruitButton.classList.remove("selected");

        let dairyButton = document.querySelector(".dairy");
        dairyButton.classList.remove("selected");

        let filteredBakeryProducts = [];

        productsList.forEach((product) => {

            if (product.secao === "Panificadora") {

                filteredBakeryProducts.push(product);

            }

        });

        createProductCard(filteredBakeryProducts);

        totalPrice(filteredBakeryProducts);

    });

}

function filteringDairyProducts(productsList) {

    let dairyButton = document.querySelector(".dairy");

    dairyButton.addEventListener("click", () => {

        dairyButton.classList.add("selected");

        let allProductsButton = document.querySelector(".all-products");
        allProductsButton.classList.remove("selected");

        let hortifruitButton = document.querySelector(".hortifruit");
        hortifruitButton.classList.remove("selected");

        let bakeryButton = document.querySelector(".bakery");
        bakeryButton.classList.remove("selected");

        let filteredDairyProducts = [];

        productsList.forEach((product) => {

            if (product.secao === "Laticínios") {

                filteredDairyProducts.push(product);

            }

        });

        createProductCard(filteredDairyProducts);

        totalPrice(filteredDairyProducts);

    });

}

function totalPrice(productsList) {

    let priceParagraph = document.querySelector(".price-paragraph");
    priceParagraph.classList.add("price-paragraph");

    let total = 0;

    productsList.forEach((product) => {
        total += product.preco;
    });

    priceParagraph.innerText = `R$ ${total.toFixed(2).replace(".", ",")}`;

}

function createProductCard(productsList) {

    let ulProductsList = document.querySelector(".ul-products-list");
    ulProductsList.innerText = "";

    productsList.forEach((product) => {

        let productCard = document.createElement("li");
        productCard.classList.add("product-card");
        ulProductsList.append(productCard);

        createProductCardImageBox(product, productCard);

        createProductCardDescription(product, productCard);

    });

}

function createProductCardImageBox(product, productCard) {

    let imageBox = document.createElement("div");
    imageBox.classList.add("image-box");
    productCard.append(imageBox);

    createFigure(product, imageBox);

}

function createFigure(product, imageBox) {

    let figure = document.createElement("figure");
    figure.classList.add("product-figure");
    imageBox.append(figure);

    let productImg = document.createElement("img");
    productImg.src = product.img;
    productImg.alt = product.nome;
    productImg.classList.add("product-image");
    figure.append(productImg);

    let productFigcaption = document.createElement("figcaption");
    productFigcaption.innerText = product.nome;
    figure.append(productFigcaption);
}

function createProductCardDescription(product, productCard) {

    let productDescription = document.createElement("div");
    productDescription.classList.add("product-description");
    productCard.append(productDescription);

    createDescription(product, productDescription);

}

function createDescription(product, productDescription) {

    let productName = document.createElement("h3");
    productName.classList.add("product-name")
    productName.innerText = product.nome;
    productDescription.append(productName);

    let productSection = document.createElement("span");
    productSection.classList.add("product-section");
    productSection.innerText = product.secao;
    productDescription.append(productSection);

    let productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.innerText = `R$ ${product.preco.toFixed(2).replace(".", ",")}`;
    productDescription.append(productPrice);

}

general(produtos);

