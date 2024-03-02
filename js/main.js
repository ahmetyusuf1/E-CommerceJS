// console.log("connection control");

// Categories
const categories = document.querySelector(".categories");
// console.log(categories);

// Products
const products = document.querySelector(".products");
// console.log(products);

// Open Button
const openButton = document.getElementById("open-button");
// console.log(openButton);

// Close Button
const closeButton = document.getElementById("close-button");
// console.log(closeButton);

// Basket Modal
const modal = document.getElementById("modal");
// console.log(modal);

// Modal List
const modalList = document.querySelector(".modal-list");
// console.log(modalList);

// Total Price
const totalPrice = document.querySelector(".total-price");
// console.log(totalPrice);

const fetchCategories = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) =>
      data.slice(0, 4).map((fetchCategory) => {
        const { category, image } = fetchCategory;

        // console.log(fetchCategory)
        // console.log(name)
        // console.log(image)

        const categoryDiv = document.createElement("div");

        categoryDiv.classList.add("category");

        categoryDiv.innerHTML = `<img src=${image}>
        <span>${category}</span>`;

        // console.log(categoryDiv)

        categories.appendChild(categoryDiv);
      })
    )
    .catch((error) => console.log("API Error!", error));
};

fetchCategories();

const fetchProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) =>
      data.map((fetchProduct) => {
        const { id, image, title, category, price } = fetchProduct;

        // console.log(data);

        const productDiv = document.createElement("div");

        productDiv.classList.add("product");

        productDiv.innerHTML = `<img src=${image}>
      <p>${title}</p>
      <p>${category}</p>
      <div class="product-action">
          <p>${price} $</p>
          <button onClick="addToBasket({id:${id},title:'${title}',price:${price},image:'${image}',amount:1})">Add to Basket</button>
      </div>`;

        // console.log(productDiv);

        products.appendChild(productDiv);
      })
    )
    .catch((error) => console.log("API Error!", error));
};

fetchProducts();

let basket = [];

let total = 0;

const addToBasket = (fetchProduct) => {
  // console.log("addToBasket func is working");
  // console.log(fetchProduct);

  const sameIdElement = basket.find(
    (elementInBasket) => elementInBasket.id === fetchProduct.id
  );
  // console.log(sameIdElement);

  if (sameIdElement) {
    sameIdElement.amount++;
  } else {
    basket.push(fetchProduct);
  }

  // console.log(basket);
};

const showBasketItem = () => {
  // console.log("showBasketItem func is working");

  basket.map((basketProduct) => {
    // console.log(basketProduct);
    const { id, image, title, price, amount } = basketProduct;

    const listItem = document.createElement("div");

    listItem.classList.add("list-item");

    listItem.innerHTML = `
    <img src=${image} />
      <h3>${title}</h3>
      <h3 class="price"><span>${price}</span>$</h3>
      <p>Amount: ${amount}</p>
      <button class="delete-button" onClick="deleteItem({id:${id}, price:${price}, amount:${amount}})">Del</button>
    `;

    modalList.appendChild(listItem);

    total += price * amount;

    // console.log(listItem);
  });
};

openButton.addEventListener("click", () => {
  // console.log("Basket button has clicked");

  showBasketItem();

  modal.classList.add("active");
  totalPrice.innerHTML = `Total: ${total} $`;
});

closeButton.addEventListener("click", () => {
  // console.log("Close Button has clicked");

  modal.classList.remove("active");
  
  modalList.innerHTML = "";

  total = 0;

});

modal.addEventListener("click", (event) => {
  // console.log("Modal has clicked");
  // console.log(event.target);

  if (event.target.classList.contains("modal-wrapper")) {
    modal.classList.remove("active");
  }
});

const deleteItem = (willDeleteItem) => {
  // console.log(willDeleteItem);

  // console.log("before delete", basket);

  basket = basket.filter((element) => element.id !== willDeleteItem.id);

  // console.log("after delete", basket);

  total -= willDeleteItem.price * willDeleteItem.amount;
  totalPrice.innerText = total;
};

modalList.addEventListener("click", (event) => {
  // console.log(event.target.parentElement);

  if (event.target.classList.contains("delete-button")) {
    event.target.parentElement.remove();
  }

  if (basket.length === 0) {
    modal.classList.remove("active");
  }
});
