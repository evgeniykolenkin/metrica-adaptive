const BURGER_OPENED_CLASSNAME = "burger__open";
const BURGER_BTN_OPENED_CLASSNAME = "burger__btn-open";
const BODY_FIXED_CLASSNAME_2 = "body__fixed";

const burgerBodyNode = document.querySelector("body");
const burgerNode = document.querySelector(".js-burger");
const burgerBtnNode = document.querySelector(".js-burger__btn");
const burgerContentNode = document.querySelector(".js-burger__content");

burgerBtnNode.addEventListener("click", toggleBurger);

burgerNode.addEventListener("click", (event) => {
  const isClickOutsideContent = !event
    .composedPath()
    .includes(burgerContentNode);

  if (isClickOutsideContent) {
    toggleBurger();
  }
});

function toggleBurger() {
  burgerNode.classList.toggle(BURGER_OPENED_CLASSNAME);
  burgerBodyNode.classList.toggle(BODY_FIXED_CLASSNAME_2);
  burgerBtnNode.classList.toggle(BURGER_BTN_OPENED_CLASSNAME);
}
