document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.getElementById("productsContainer");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");

  let products = [];

  fetch("products.json")
      .then((response) => response.json())
      .then((data) => {
          products = data;
          displayProducts(products);
      })
      .catch((error) => {
          console.error("Error fetching product data:", error);
      });

  function displayProducts(productsToDisplay) {
      productsContainer.innerHTML = "";

      productsToDisplay.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");

          const productImage = document.createElement("img");
          productImage.src = product.image;
          productImage.alt = product.name;
          productImage.classList.add("product-image");

          const productName = document.createElement("div");
          productName.textContent = product.name;
          productName.classList.add("product-name");

          const productDescription = document.createElement("div");
          productDescription.textContent = product.description;
          productDescription.classList.add("product-description");

          const productPrice = document.createElement("div");
          productPrice.textContent = "Price: $" + product.price;
          productPrice.classList.add("product-price");

          productCard.appendChild(productImage);
          productCard.appendChild(productName);
          productCard.appendChild(productDescription);
          productCard.appendChild(productPrice);

          productsContainer.appendChild(productCard);
      });
  }

  searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
      );
      displayProducts(filteredProducts);
  });

  sortSelect.addEventListener("change", function () {
      const sortBy = sortSelect.value;
      const sortedProducts = [...products];

      if (sortBy === "name") {
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === "price") {
          sortedProducts.sort((a, b) => a.price - b.price);
      }

      displayProducts(sortedProducts);
  });
});
