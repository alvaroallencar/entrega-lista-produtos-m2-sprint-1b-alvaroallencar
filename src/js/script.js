// array global que contém os produtos no carrinho:

let itemsAddedToCart = [];

// Função que inicia a lógica e chama as outras funções:

function general(products) {

    search(products);

    createProductCard(products);

    totalPriceAndQuantity(itemsAddedToCart);

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

    });

}

function filteringHortifruitProducts(productsList) {

    let hortifruitButton = document.querySelector(".hortifruit");

    hortifruitButton.addEventListener("click", () => {

        removeClassSelected();
        hortifruitButton.classList.add("selected");

        let filteredHortifruitProducts = productsList.filter(product => product.secao === "Hortifruti");

        createProductCard(filteredHortifruitProducts);

    });

}

function filteringBakeryProducts(productsList) {

    let bakeryButton = document.querySelector(".bakery");

    bakeryButton.addEventListener("click", () => {

        removeClassSelected();
        bakeryButton.classList.add("selected");

        let filteredBakeryProducts = productsList.filter(product => product.secao === "Panificadora");

        createProductCard(filteredBakeryProducts);

    });

}

function filteringDairyProducts(productsList) {

    let dairyButton = document.querySelector(".dairy");

    dairyButton.addEventListener("click", () => {

        removeClassSelected();
        dairyButton.classList.add("selected");

        let filteredDairyProducts = productsList.filter(product => product.secao === "Laticínios");

        createProductCard(filteredDairyProducts);

    });

}

function totalPriceAndQuantity(productsList) {

    let priceParagraph = document.querySelector(".total-value");

    let quantityParagraph = document.querySelector(".quantity-value");

    let total = productsList.reduce((acc, currentValue) => acc + currentValue.preco, 0);

    priceParagraph.innerText = `R$ ${total.toFixed(2).replace(".", ",")}`;

    quantityParagraph.innerText = productsList.length;

    if (productsList.length < 1)
        emptyCart();

}

function emptyCart() {

    let emptyCartBox = document.querySelector(".ul-items-in-cart");
    emptyCartBox.innerText = "";

    let emptyCartParagraph = document.createElement("p");
    emptyCartParagraph.classList.add("empty-cart");
    emptyCartParagraph.innerText = "Por enquanto não há produtos no carrinho";
    emptyCartBox.append(emptyCartParagraph);

}


function createProductCard(productsList) {

    let ulProductsList = document.querySelector(".ul-products-list");
    ulProductsList.innerText = "";

    productsList.forEach((product, index) => {

        let productCard = document.createElement("li");
        productCard.classList.add("product-card");
        ulProductsList.append(productCard);

        createProductCardImageBox(product, productCard);

        createProductCardDescription(product, index, productCard);

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

function createProductCardDescription(product, index, productCard) {

    let productDescription = document.createElement("div");
    productDescription.classList.add("product-description");
    productCard.append(productDescription);

    createDescription(product, index, productDescription);

}

function createDescription(product, index, productDescription) {

    let productDescriptionFirstColumn = document.createElement("div");
    productDescriptionFirstColumn.classList.add("product-description-first-column");
    productDescription.append(productDescriptionFirstColumn);

    let productName = document.createElement("h3");
    productName.classList.add("product-name")
    productName.innerText = product.nome;
    productDescriptionFirstColumn.append(productName);

    let productSection = document.createElement("span");
    productSection.classList.add("product-section");
    productSection.innerText = product.secao;
    productDescriptionFirstColumn.append(productSection);

    let productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.innerText = `R$ ${product.preco.toFixed(2).replace(".", ",")}`;
    productDescriptionFirstColumn.append(productPrice);

    createNutritionalInformationBox(product, productDescription);

    createAddToCartButton(product, index, productDescriptionFirstColumn);

}

function createNutritionalInformationBox(product, productDescription) {

    let productDescriptionSecondColumn = document.createElement("div");
    productDescriptionSecondColumn.classList.add("product-description-second-column");
    productDescription.append(productDescriptionSecondColumn);

    let productNutritionalInformation = document.createElement("h3");
    productNutritionalInformation.classList.add("product-nutritional-information");
    productNutritionalInformation.innerText = "Informação Nutricional:";
    productDescriptionSecondColumn.append(productNutritionalInformation);

    let ulNutritionalInformation = document.createElement("ul");
    ulNutritionalInformation.classList.add("ul-nutritional-information");
    productDescriptionSecondColumn.append(ulNutritionalInformation);

    product.componentes.forEach((information) => {

        let li = document.createElement("li");
        li.classList.add("nutritional-information");
        li.innerText = information;
        ulNutritionalInformation.append(li);

    });

}

function createAddToCartButton(product, index, productDescriptionFirstColumn) {

    let addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart-button");
    addToCartButton.setAttribute("id", index);
    addToCartButton.innerText = "Comprar";
    productDescriptionFirstColumn.append(addToCartButton);

    addingEventListenerToButton(product, itemsAddedToCart, addToCartButton);

}

function addingEventListenerToButton(product, itemsAddedToCart, addToCartButton) {

    addToCartButton.addEventListener("click", (e) => {

        itemsAddedToCart.push(product);

        AddingItemsToCart(itemsAddedToCart);

        totalPriceAndQuantity(itemsAddedToCart);

    });

}

function AddingItemsToCart(itemsAddedToCart) {

    let ulItensInCart = document.querySelector(".ul-items-in-cart");

    // console.log(itemsAddedToCart);

    renderingEveryItemInCart(ulItensInCart, itemsAddedToCart);


}

function renderingEveryItemInCart(ulItensInCart, itemsAddedToCart) {

    ulItensInCart.innerText = "";

    for (let i = 0; i < itemsAddedToCart.length; i++) {

        itemsAddedToCart[i].cartID = i;

        let li = document.createElement("li");
        li.classList.add("item-in-cart");
        ulItensInCart.append(li);

        creatingImageBoxInCart(li, i, itemsAddedToCart);

        creatingProductDescriptionInCart(li, i, itemsAddedToCart);

    }

}

function creatingImageBoxInCart(li, i, itemsAddedToCart) {

    let productImageBoxInCart = document.createElement("div");
    productImageBoxInCart.classList.add("product-image-box-in-cart");
    li.append(productImageBoxInCart);

    let img = document.createElement("img");
    img.classList.add("image-in-cart");
    img.src = itemsAddedToCart[i].img;
    img.alt = itemsAddedToCart[i].nome;
    productImageBoxInCart.append(img);

}

function creatingProductDescriptionInCart(li, i, itemsAddedToCart) {

    let productDescriptionBox = document.createElement("div");
    productDescriptionBox.classList.add("product-description-box");
    li.append(productDescriptionBox);

    let productDescription = document.createElement("div");
    productDescription.classList.add("product-description-in-cart");
    productDescriptionBox.append(productDescription);

    let productNameInCart = document.createElement("h3");
    productNameInCart.classList.add("product-name-in-cart");
    productNameInCart.innerText = itemsAddedToCart[i].nome;

    let productSectionInCart = document.createElement("p");
    productSectionInCart.classList.add("product-section-in-cart");
    productSectionInCart.innerText = itemsAddedToCart[i].secao;

    let productPriceInCart = document.createElement("p");
    productPriceInCart.classList.add("product-price-in-cart");
    productPriceInCart.innerText = `R$ ${itemsAddedToCart[i].preco.toFixed(2).replace(".", ",")}`;

    productDescription.append(productNameInCart, productSectionInCart, productPriceInCart);

    creatingRemoveFromCartButtonAndEvent(i, productDescriptionBox, itemsAddedToCart);

}

function creatingRemoveFromCartButtonAndEvent(i, productDescriptionBox, itemsAddedToCart) {

    // console.log(itemsAddedToCart);


    let removeFromCartButton = document.createElement("button");
    removeFromCartButton.classList.add("remove-from-cart-button", `${itemsAddedToCart[i].id}`);
    removeFromCartButton.id = i;   //itemsAddedToCart[i].cartID;
    removeFromCartButton.innerText = "Remover";
    productDescriptionBox.append(removeFromCartButton);

    removeFromCartButton.addEventListener("click", (e) => {
        //console.log(itemsAddedToCart);
        itemsAddedToCart = removeProductFromCart(itemsAddedToCart, i);

        //console.log(itemsAddedToCart[index].cartID)
        // console.log(itemsAddedToCart);

        AddingItemsToCart(itemsAddedToCart);

        totalPriceAndQuantity(itemsAddedToCart);

    });

}

function removeProductFromCart(updatedCart, idToRemove) {

    for (let i = 0; i < updatedCart.length; i++) {

        if (idToRemove === i) {

            updatedCart.splice(i, 1);

            console.log("Removido 1 item");

        }

    }
    return updatedCart;
}

general(produtos);

