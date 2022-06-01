
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

        removeClassSelected();
        allProductsButton.classList.add("selected");

        let searchInput = document.querySelector(".search-input");

        let searchInputValue = searchInput.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let filteredSearch = filteringSearch(productsList, searchInputValue);

        createProductCard(filteredSearch);

        totalPrice(filteredSearch);

    });

}

function filteringSearch(productsList, searchInputValue) {

    let filtered = productsList.filter((product) => {

        let searchFiltersCheckers = {
            removingSpecialCharsFromName: product.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchInputValue),
            notRemovingSpecialCharsFromName: product.nome.toLowerCase().includes(searchInputValue),
            removingSpecialCharsFromSection: product.secao.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchInputValue),
            notRemovingSpecialCharsFromSection: product.secao.toLowerCase().includes(searchInputValue),
            removingSpecialCharsFromCategory: product.categoria.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchInputValue),
            notRemovingSpecialCharsFromCategory: product.categoria.toLowerCase().includes(searchInputValue),
        };

        return searchFiltersCheckers.removingSpecialCharsFromName || searchFiltersCheckers.notRemovingSpecialCharsFromName ||
            searchFiltersCheckers.removingSpecialCharsFromSection || searchFiltersCheckers.notRemovingSpecialCharsFromSection ||
            searchFiltersCheckers.removingSpecialCharsFromCategory || searchFiltersCheckers.notRemovingSpecialCharsFromCategory;

    });

    return filtered;

}

function addingEventListenersToHeaderButtons(productsList) {

    filteringAllProducts(productsList);

    filteringHortifruitProducts(productsList);

    filteringBakeryProducts(productsList);

    filteringDairyProducts(productsList);

}

function removeClassSelected() {

    let allProductsButton = document.querySelector(".all-products");
    allProductsButton.classList.remove("selected");

    let hortifruitButton = document.querySelector(".hortifruit");
    hortifruitButton.classList.remove("selected");

    let bakeryButton = document.querySelector(".bakery");
    bakeryButton.classList.remove("selected");

    let dairyButton = document.querySelector(".dairy");
    dairyButton.classList.remove("selected");

}

function filteringAllProducts(productsList) {

    let allProductsButton = document.querySelector(".all-products");

    allProductsButton.addEventListener("click", () => {

        removeClassSelected();
        allProductsButton.classList.add("selected");

        createProductCard(productsList);

        totalPrice(productsList);

    });

}

function filteringHortifruitProducts(productsList) {

    let hortifruitButton = document.querySelector(".hortifruit");

    hortifruitButton.addEventListener("click", () => {

        removeClassSelected();
        hortifruitButton.classList.add("selected");

        let filteredHortifruitProducts = productsList.filter(product => product.secao === "Hortifruti");

        createProductCard(filteredHortifruitProducts);

        totalPrice(filteredHortifruitProducts);

    });

}

function filteringBakeryProducts(productsList) {

    let bakeryButton = document.querySelector(".bakery");

    bakeryButton.addEventListener("click", () => {

        removeClassSelected();
        bakeryButton.classList.add("selected");

        let filteredBakeryProducts = productsList.filter(product => product.secao === "Panificadora");

        createProductCard(filteredBakeryProducts);

        totalPrice(filteredBakeryProducts);

    });

}

function filteringDairyProducts(productsList) {

    let dairyButton = document.querySelector(".dairy");

    dairyButton.addEventListener("click", () => {

        removeClassSelected();
        dairyButton.classList.add("selected");

        let filteredDairyProducts = productsList.filter(product => product.secao === "Laticínios");

        createProductCard(filteredDairyProducts);

        totalPrice(filteredDairyProducts);

    });

}

function totalPrice(productsList) {

    let priceParagraph = document.querySelector(".price-paragraph");
    priceParagraph.classList.add("price-paragraph");

    let total = productsList.reduce((acc, currentValue) => acc + currentValue.preco, 0);

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

    createNutritionalInformationBox(product, productDescription);

}

function createNutritionalInformationBox(product, productDescription) {

    let productNutritionalInformation = document.createElement("h3");
    productNutritionalInformation.classList.add("product-nutritional-information");
    productNutritionalInformation.innerText = "Informação Nutricional";
    productDescription.append(productNutritionalInformation);

    let ulNutritionalInformation = document.createElement("ul");
    ulNutritionalInformation.classList.add("ul-nutritional-information");
    productDescription.append(ulNutritionalInformation);

    product.componentes.forEach((information) => {

        let li = document.createElement("li");
        li.classList.add("nutritional-information");
        li.innerText = information;
        ulNutritionalInformation.append(li);

    });

}

general(produtos);

