import { API_URL } from './config.js';

const getCategories = async () => {
    let dropdownCategories = document.getElementById("dropdown-categories");
    fetch(API_URL + "/products/categories")
        .then((response) => response.json())
        .then((data) => {
            let dropdownCategories = document.getElementById("dropdown-categories");
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
    emptyProductsContainer();
    let sectionProducts = document.getElementById("products-container");
    fetch(API_URL + "/products/category/" + categoryName)
        .then((response) => response.json())
        .then((data) => {
            for (let product of data) {
                let productDiv = createProductElement(product);
                sectionProducts.appendChild(productDiv);
            }
        })
        .catch((error) => console.error(error));
}

const getAllProducts = async () => {
    emptyProductsContainer();
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

const emptyProductsContainer = () => {
    let sectionProducts = document.getElementById("products-container");
    while (sectionProducts.hasChildNodes()) {
        sectionProducts.removeChild(sectionProducts.firstChild);
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
    productPrice.appendChild(productPriceText);

    let productDescription = document.createElement("p");
    let productDescriptionText = document.createTextNode(product.description);
    productDescription.classList.add("card-text");
    productDescription.appendChild(productDescriptionText);

    let moreDetailsButton = document.createElement("button");
    moreDetailsButton.classList.add("btn", "btn-primary")
    let moreDetailsButtonText = document.createTextNode("See more details");
    moreDetailsButton.appendChild(moreDetailsButtonText);

    productDiv.appendChild(productImage);
    cardBody.append(productTitle);
    cardBody.append(productDescription);
    cardBody.append(productPrice);
    cardBody.appendChild(moreDetailsButton);
    productDiv.appendChild(cardBody);

    return productDiv;
}

const main = () => {
    getCategories();
    let productsContainer =  document.getElementById("products-container");
    if (!productsContainer.hasChildNodes()) { // TODO
        console.log("entro")
        getAllProducts();
    }
}


main();
