import { API_URL } from './config.js';

const getCategories = async () => {
    let dropdownCategories = document.getElementById("dropdown-categories");
    fetch(API_URL + "/products/categories")
        .then((response) => response.json())
        .then((data) => {
            for (let category of data) {
                let categoryListItem = document.createElement("li");
                let categoryAnchor = document.createElement("a");
                let categoryName = document.createTextNode(category.charAt(0).toUpperCase() +
                    category.slice(1))
                categoryAnchor.classList.add("dropdown-item");
                categoryAnchor.appendChild(categoryName);
                categoryListItem.appendChild(categoryAnchor);
                categoryListItem.addEventListener('click', () => {
                    getProductsByCategoryName(category);
                })
                dropdownCategories.appendChild(categoryListItem);
            }
        })
        .catch((error) => console.error(error))
}

const getProductsByCategoryName = async (categoryName) => {
    emptyContainer("product-details-container");
    emptyContainer("products-container");
    let sectionProducts = document.getElementById("products-container");
    fetch(API_URL + "/products/category/" + categoryName)
        .then((response) => response.json())
        .then((data) => {
            changeTitle(categoryName.charAt(0).toUpperCase() + categoryName.slice(1));
            for (let product of data) {
                let productDiv = createProductElement(product);
                sectionProducts.appendChild(productDiv);
            }
        })
        .catch((error) => console.error(error));
}

const getAllProducts = async () => {
    emptyContainer("product-details-container");
    emptyContainer("products-container");
    changeTitle("Welcome to Fake Store!")
    let sectionProducts = document.getElementById("products-container");
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            for (let product of data) {
                let productDiv = createProductElement(product);
                sectionProducts.appendChild(productDiv);
            }
        })
        .catch((error) => console.error(error));
}

const emptyContainer = (id) => {
    let container = document.getElementById(id);
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}


const createProductElement = (product) => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("card");

    let productTitle = document.createElement("h5");
    let productTitleText = document.createTextNode(product.title);
    productTitle.classList.add("card-title");
    productTitle.appendChild(productTitleText);

    let productImage = document.createElement("img");
    productImage.setAttribute("src", product.image);
    productImage.classList.add("card-img-top");

    let cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    let productPrice = document.createElement("h4");
    let productPriceText = document.createTextNode("$ " + product.price);
    productPrice.classList.add("price");
    productPrice.appendChild(productPriceText);

    let moreDetailsButton = document.createElement("button");
    moreDetailsButton.classList.add("btn", "btn-primary")
    let moreDetailsButtonText = document.createTextNode("See more details");
    moreDetailsButton.appendChild(moreDetailsButtonText);
    moreDetailsButton.addEventListener('click', () => viewProductDetailById(product.id, document.getElementById("title").textContent));

    productDiv.appendChild(productImage);
    cardBody.append(productTitle);
    cardBody.append(productPrice);
    cardBody.appendChild(moreDetailsButton);
    productDiv.appendChild(cardBody);

    return productDiv;
}
const changeTitle = (newTitle) => {
    let title = document.getElementById("title");
    let titleText = document.createTextNode(newTitle);
    title.removeChild(title.firstChild);
    title.appendChild(titleText);
}


const viewProductDetailById = async (id, previousPage) => {
    fetch(API_URL + "/products/" + id)
        .then((response) => response.json())
        .then((product) => {
            emptyContainer("products-container");
            changeTitle("Details of " + product.title)
            let productDetailsContainer = document.getElementById("product-details-container")

            let cardElement = document.createElement("div");
            cardElement.classList.add("details-card");

            let flexDivElement = document.createElement("div");
            flexDivElement.classList.add("d-flex", "justify-content-around", "align-items-center", "mb-5");

            let imgElement = document.createElement("img");
            imgElement.classList.add("card-img-top");
            imgElement.setAttribute("src", product.image);

            let price = document.createElement("h1");
            let priceText = document.createTextNode("$ " + product.price);
            price.appendChild(priceText);
            price.classList.add("price");
            let innerDivElement = document.createElement("div");
            innerDivElement.classList.add("d-flex", "justify-content-center", "flex-column")
            let addToCartButton = document.createElement("button");
            addToCartButton.classList.add("btn", "btn-success");
            let addToCartText = document.createTextNode("Add to cart");
            addToCartButton.appendChild(addToCartText);

            innerDivElement.appendChild(price);
            innerDivElement.appendChild(addToCartButton);

            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            let cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            let cardTitleText = document.createTextNode(product.title);
            cardTitle.appendChild(cardTitleText);

            let cardText = document.createElement("p");
            cardText.classList.add("card-text");
            let cardTextContent = document.createTextNode(product.description);
            cardText.appendChild(cardTextContent);

            let returnButton = document.createElement("button");
            let returnText = document.createTextNode("Return back");
            returnButton.appendChild(returnText);
            returnButton.classList.add("btn", "btn-secondary", "mt-3");
            returnButton.addEventListener('click', () => {
                if (previousPage === "Welcome to Fake Store!") {
                    getAllProducts();
                } else {
                    getProductsByCategoryName(previousPage.toLowerCase())
                }
            }
            )

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            flexDivElement.appendChild(imgElement);
            flexDivElement.appendChild(innerDivElement);
            cardElement.appendChild(flexDivElement);
            cardElement.appendChild(cardBody);
            cardElement.appendChild(returnButton);

            productDetailsContainer.appendChild(cardElement);
        })
        .catch((error) => console.error(error));
}

const main = () => {
    getCategories();
    getAllProducts();
}


main();
