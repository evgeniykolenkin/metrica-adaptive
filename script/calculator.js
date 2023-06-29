// константы из HTML
const selectPlace = document.querySelector(".calculator__place");
const resultCost = document.querySelector(".calculator__result-cost");
const inputRange = document.querySelector(".input__range");
const inputRangeNumber = document.querySelector(".calculator__range-number");
const resultTotal = document.querySelector(".calculator__result-total");
const compaundData = document.querySelector(".calculator__compaund-data");
const additionsList = document.querySelector(".calculator__additions-list");
const extrasList = document.querySelector(".calculator__extras-list");

// изменяемые переменные
let TOTAL_COST = 44000;
let SQUARE_METER_COST = 1000;

// функции-------------------------------------------
function totalCost() {
  let cost = inputRange.value * SQUARE_METER_COST;
  inputRangeNumber.innerHTML = inputRange.value;
  resultTotal.innerText = `${cost.toLocaleString()} ₽`;

  let realCheckbox = document.querySelectorAll(".real__checkbox");

  for (input of realCheckbox) {
    if (input.checked) {
      cost += Number(input.value);
      resultTotal.innerText = `${cost.toLocaleString()} ₽`;
    }
  }

  return cost;
}

function countSquareCost(e) {
  if (e.target.value === "квартира") {
    SQUARE_METER_COST = 1000;
    resultCost.innerHTML = `${SQUARE_METER_COST.toLocaleString()} ₽/м²`;
    totalCost();
  }
  if (e.target.value === "дом") {
    SQUARE_METER_COST = 1500;
    resultCost.innerHTML = `${SQUARE_METER_COST.toLocaleString()} ₽/м²`;
    totalCost();
  }
}

function subtraction(e) {
  const parentNode = e.target.closest(".calculator__compaund-item");
  const span = parentNode.querySelector(".compaund__amount");
  let amount = Number(span.innerHTML);
  if (e.target.dataset.action === "minus") {
    const newAmount = amount - 1;
    span.innerHTML = newAmount;
  }
  if (amount <= 0) {
    span.innerHTML = 0;
  }
}

function addition(e) {
  const parentNode = e.target.closest(".calculator__compaund-item");
  const span = parentNode.querySelector(".compaund__amount");
  let amount = Number(span.innerHTML);
  if (e.target.dataset.action === "plus") {
    const newAmount = amount + 1;
    span.innerHTML = newAmount;
  }
}

function colorLabel(e) {
  const parentNode = e.target.closest(".calculator__additions-item");
  if (e.target.dataset.action === "check") {
    const span = parentNode.querySelector(".hidden__checkbox");
    parentNode.classList.toggle("addition__checked");
    span.classList.toggle("show__checkbox");
  }
}

// слушатели событий
inputRange.addEventListener("input", totalCost);
selectPlace.addEventListener("change", countSquareCost);
compaundData.addEventListener("click", subtraction);
compaundData.addEventListener("click", addition);
additionsList.addEventListener("click", colorLabel);
extrasList.addEventListener("click", totalCost);
