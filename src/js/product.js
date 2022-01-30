import numeral from 'numeraljs';

// Variables
const body = document.body;
const previewedImage = document.querySelector('.image__previewed');
const productModalExit = document.querySelector('.product__modal__exit');
const productControls = document.querySelector('.product__controls');
const increaseButton = document.querySelector('.increase');
const decreaseButton = document.querySelector('.decrease');
const quantityCounter = document.querySelector('.quantity');
const basket = document.querySelector('.basket');
const cartCounter = document.querySelector('.cart__icon__counter');
const addToCart = document.querySelector('.add__to__cart');
const basketContent = document.querySelector('.basket__content');
const productOldPrice = document.querySelector('.before__sale').textContent;
const productSalePercentage = document.querySelector('.sale__percentage').textContent;
const allThumbnails = document.querySelectorAll('.image__thumbnail');
const imagePreviews = document.querySelectorAll('.main__preview');
const productModal = document.querySelector('.product__modal');
const otherPreviews = productModal.querySelector('.other__previews');
const modalArrows = document.querySelectorAll('.arrow');
const regex = /\d+/;

// Flags
let quantityCount = 0;
let thumbnailsNumbers = [];

// Functions
const updateCartItem = quantityCount => {
  const oldPrice = productOldPrice
    .substring(1)
    .replace(productOldPrice.substring(1).slice(productOldPrice.length - 4), '');
  const salePercentage = productSalePercentage.replace(
    productSalePercentage.slice(productSalePercentage.length - 1),
    ''
  );
  const newPrice = oldPrice * (salePercentage / 100);
  const totalPrice = newPrice * quantityCount;

  let innerHTML = `
    <div class="cart__item">
    <img src="/images/image-product-1-thumbnail.jpg" class="cart__item__image" />
    <div class="cart__item__info">
    <h4 class="cart__item__info__name">Fall Limited Edition Sneakers</h4>
    <div class="cart__item__info__pricing">
    <h4 class="cart__item__info__pricing__price">${numeral(newPrice).format('$0,0.00')}</h4>
    <h4 class="cart__item__info__pricing__quantity">x ${quantityCount}</h4>
    <h4 class="cart__item__info__pricing__total">${numeral(totalPrice).format('$0,0.00')}</h4>
    </div>
    </div>
    <i class="bx bxs-trash-alt cart__item__delete"></i>
    </div>
    <button class="checkout">Checkout</button>
    `;
  basketContent.innerHTML = innerHTML;
  document.querySelector('.cart__item__delete').addEventListener('click', () => deleteCartItem());
};
const deleteCartItem = () => {
  quantityCount = 0;
  updateQuantity();
};
const updateQuantity = () => {
  if (quantityCount >= 1) {
    quantityCounter.innerHTML = quantityCount;
    cartCounter.innerHTML = quantityCount;
    if (!basket.classList.contains('not__empty__basket'))
      basket.classList.add('not__empty__basket');
    updateCartItem(quantityCount);
  } else {
    quantityCount = 0;
    productControls.classList.add('not__yet__added');
    quantityCounter.innerHTML = quantityCount;
    cartCounter.innerHTML = quantityCount;
    basket.classList.remove('not__empty__basket');
  }
};
const selectThumbnail = clickedThumbnail => {
  const thumbnailImg = clickedThumbnail.querySelector('img');

  allThumbnails.forEach(thumbnail => {
    thumbnail.classList.remove('selected');
  });

  allThumbnails.forEach(thumbnail => {
    if (thumbnail.querySelector('img').src === thumbnailImg.src) {
      thumbnail.classList.add('selected');
      const selectedThumbnailImg = thumbnail.querySelector('img');

      imagePreviews.forEach(preview => {
        preview.querySelector('img').src = selectedThumbnailImg.src.replace(
          selectedThumbnailImg.src.match('-thumbnail'),
          ''
        );
      });
    }
  });
};
const arrowSwitch = e => {
  const dir = e.currentTarget.classList[1]; // [0] is 'arrow'

  const thumbnail = otherPreviews.querySelector('.selected');
  const thumbnailImg = thumbnail.querySelector('img');
  const thumbnailNumber = thumbnailImg.src
    .replace(thumbnailImg.src.match('3000'), '') // in case of dev
    .replace(thumbnailImg.src.match('5000'), '') // in case of build
    .match(regex);

  for (let i = 0; i < otherPreviews.children.length; i++) {
    thumbnailsNumbers.unshift(otherPreviews.children.length - i);
  }

  dir == 'next'
    ? thumbnailNumber == thumbnailsNumbers[thumbnailsNumbers.length - 1]
      ? otherPreviews.firstElementChild.click()
      : thumbnail.nextElementSibling.click()
    : thumbnailNumber == thumbnailsNumbers[0]
    ? otherPreviews.lastElementChild.click()
    : thumbnail.previousElementSibling.click();
};

// EventListeners
previewedImage.addEventListener('click', () => {
  body.classList.add('product__modal__enabled');
});
productModalExit.addEventListener('click', () => {
  body.classList.remove('product__modal__enabled');
});
addToCart.addEventListener('click', () => {
  productControls.classList.remove('not__yet__added');
  quantityCount++;
  updateQuantity();
});
increaseButton.addEventListener('click', () => {
  quantityCount++;
  updateQuantity();
});
decreaseButton.addEventListener('click', () => {
  quantityCount--;
  updateQuantity();
});
allThumbnails.forEach(thumbnail =>
  thumbnail.addEventListener('click', () => selectThumbnail(thumbnail))
);
modalArrows.forEach(arrow => arrow.addEventListener('click', e => arrowSwitch(e)));
