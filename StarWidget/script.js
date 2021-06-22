// mock data
const products = [
  {
    uuid: "7f168171-c185-4670-9f3d-d744c0be4e3c",
    name: "product_1",
    rate: 2.2,
  },
  { uuid: "93b33552-95ae-4915-8a9c-1a6365d2f705", name: "product_2", rate: 4 },
  {
    uuid: "4cfbe66e-0647-4e29-ae58-2c1bd029bec9",
    name: "product_3",
    rate: 3.5,
  },
  {
    uuid: "6731c160-9a71-4225-8a49-1e4b7cf87aec",
    name: "product_4",
    rate: 1.2,
  },
  { uuid: "4d9e7851-795c-4754-9012-a8e5b477a44b", name: "product_5", rate: 0 },
  {
    uuid: "5efbb0d4-cbb9-462b-a067-8230720e4779",
    name: "product_6",
    rate: 2.8,
  },
  { uuid: "414d2b97-ed09-4ce7-8edb-7ce1ad603937", name: "product_7", rate: 0 },
  { uuid: "60603512-e849-46ce-9cf4-524f10d4ad40", name: "product_8", rate: 5 },
  { uuid: "7f93d743-6a11-49ff-b27b-de1128d904bf", name: "product_9", rate: 0 },
  { uuid: "37b42e92-f9c9-4abf-b7f6-7ebdee2cea09", name: "product_10", rate: 3 },
];

const maxStar = 5;
const productsContainer = document.querySelector(".products");

const calStars = (rate, maxRate) =>
  `${Math.round(((rate / maxRate) * 100) / 10) * 10}%`;

window.addEventListener("load", function (e) {
  products.map((p) => renderProduct(p));
});

const renderProduct = function (data) {
  const html = `
    <tr class="${data.name}">
    <td>${data.uuid}</td>
    <td>${data.name}</td>
    <td class="stars-container">
      <div class="stars-outer">
        <div class="stars-checked"></div>
        <div class="stars-selected"></div>
      </div>
    </td>
  </tr>
    `;

  productsContainer.insertAdjacentHTML("beforeend", html);

  const starsUnchecked = document.querySelector(`.${data.name} .stars-outer`);
  const starsChecked = document.querySelector(`.${data.name} .stars-checked`);
  const starsSelected = document.querySelector(`.${data.name} .stars-selected`);
  const starsContainer = document.querySelector(
    `.${data.name} .stars-container`
  );
  starsChecked.style.width = calStars(data.rate, maxStar);

  starsUnchecked.addEventListener(
    "mousemove",
    function (event) {
      starsChecked.style.opacity = 0;
      starsSelected.style.opacity = 1;
      const x = event.offsetX;
      const width = event.target.scrollWidth;
      starsSelected.style.width = calStars(x, width);
    },
    false
  );

  starsUnchecked.addEventListener("click", function (event) {
    const x = event.offsetX;
    const width = event.target.scrollWidth;
    const rate = Math.round((x / width) * 50) / 10;

    // update Product rate through API here

    // update state
    const productIndex = products.findIndex((x) => x.uuid == data.uuid);
    products[productIndex].rate = Math.round(((x / width) * 100) / 10) / 2;

    // update views
    starsChecked.style.width = calStars(rate, maxStar);
  });

  starsContainer.addEventListener("mouseleave", function () {
    starsChecked.style.opacity = 1;
    starsSelected.style.opacity = 0;
  });
};
