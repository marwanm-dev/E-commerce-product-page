// Todo increment & decrement adding to the cart
// Todo switch images by arrows(in product__modal & in mobile__mode)
// Todo switch images by thumbnails(in desktop mode & product__modal)
import numeral from 'numeraljs';
// Variables
const previewedImage = document.querySelector('.image__previewed');
const productModalExit = document.querySelector('.product__modal__exit');
const productControls = document.querySelector('.product__controls');
const body = document.body;
const increaseButton = document.querySelector('.increase');
const decreaseButton = document.querySelector('.decrease');
const quantityCounter = document.querySelector('.quantity');
const basket = document.querySelector('.basket');
const cartCounter = document.querySelector('.cart__icon__counter');
const addToCart = document.querySelector('.add__to__cart');
const basketContent = document.querySelector('.basket__content');
const productOldPrice = document.querySelector('.before__sale').textContent;
const productSalePercentage = document.querySelector('.sale__percentage').textContent;

// Flags
let quantityCount = 0;

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

  // todo use numeral.js
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
const selectThumbnail = () => {
  const allThumbnails = document.querySelectorAll('.image__thumbnail');
  const thumbnailsInProduct = document.querySelectorAll('.product__preview .image__thumbnail');
  const thumbnailsInModal = document.querySelectorAll('.product__modal .image__thumbnail');
  const imagePreviewedInProduct = document.querySelector('.product__preview .image__previewed');
  const imagePreviewedInModal = document.querySelector('.product__modal .image__previewed');

  // todo all thumbnails remove class 'selected' then add on image thumbnail both in product & modal
  allThumbnails.forEach(thumbnail =>
    thumbnail.addEventListener('click', () =>
      allThumbnails.forEach(thumbnail => thumbnail.classList.remove('selected'))
    )
  );

  thumbnailsInProduct.forEach(thumbnail =>
    thumbnail.addEventListener('click', () => {
      thumbnail.classList.add('selected');
      const thumbnailImg = thumbnail.querySelector('img');
      const imagePreviewedImg = imagePreviewedInProduct.querySelector('img');
      const thumbnailImgSrc = thumbnailImg.src.replace(thumbnailImg.src.match('-thumbnail'), '');
      imagePreviewedImg.src = thumbnailImgSrc;
    })
  );
  thumbnailsInModal.forEach(thumbnail =>
    thumbnail.addEventListener('click', () => {
      thumbnail.classList.add('selected');
      const thumbnailImg = thumbnail.querySelector('img');
      const imagePreviewedImg = imagePreviewedInModal.querySelector('img');
      const thumbnailImgSrc = thumbnailImg.src.replace(thumbnailImg.src.match('-thumbnail'), '');
      imagePreviewedImg.src = thumbnailImgSrc;
    })
  );
};

selectThumbnail();
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
