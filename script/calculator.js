// константы из HTML
const selectPlace = document.getElementById("calculator__place");
const resultCost = document.getElementById("calculator__result-cost");
const inputRange = document.getElementById("input__range");
const inputRangeNumber = document.getElementById("calculator__range-number");
const resultTotal = document.getElementById("calculator__result-total");
const compaundData = document.getElementById("calculator__compaund-data");
const additionsList = document.getElementById("calculator__additions-list");
const extrasList = document.getElementById("calculator__extras-list");

// изменяемые переменные
let TOTAL_COST = 44000;
let SQUARE_METER_COST = 1000;

// функции-------------------------------------------

// считаем общую сумму
function getTotalCost() {
  let cost = inputRange.value * SQUARE_METER_COST;
  inputRangeNumber.innerHTML = inputRange.value;
  resultTotal.innerText = `${cost.toLocaleString()} ₽`;

  // учитываем отмеченные инпуты в доп услугах
  let realCheckbox = document.querySelectorAll(".real__checkbox");

  for (input of realCheckbox) {
    if (input.checked) {
      cost += Number(input.value);
      resultTotal.innerText = `${cost.toLocaleString()} ₽`;
    }
  }

  return cost;
}

// меняем цену за квадратный метр в зависимости от выбранной опции в селекте
function countSquareCost(e) {
  if (e.target.value === "квартира") {
    SQUARE_METER_COST = 1000;
    resultCost.innerHTML = `${SQUARE_METER_COST.toLocaleString()} ₽/м²`;
    getTotalCost();
  }
  if (e.target.value === "дом") {
    SQUARE_METER_COST = 1500;
    resultCost.innerHTML = `${SQUARE_METER_COST.toLocaleString()} ₽/м²`;
    getTotalCost();
  }
}

// задаём логику для знаков минус
function subtraction(e) {
  // получаем родителя таргета, это список со всеми минусами и плюсами
  const parentNode = e.target.closest(".calculator__compaund-item");
  // находим элемент(кнопку "минус") внтури родителя
  const span = parentNode.querySelector(".compaund__amount");
  let amount = Number(span.innerHTML);
  // проверяем, что клик прошёл по нему
  if (e.target.dataset.action === "minus") {
    const newAmount = amount - 1;
    span.innerHTML = newAmount;
  }
  if (amount <= 0) {
    span.innerHTML = 0;
  }
}

// задаём логику для знаков плюс
function addition(e) {
  // получаем родителя таргета, это список со всеми минусами и плюсами
  const parentNode = e.target.closest(".calculator__compaund-item");
  // находим элемент(кнопку "плюс") внтури родителя
  const span = parentNode.querySelector(".compaund__amount");
  let amount = Number(span.innerHTML);
  // проверяем, что клик прошёл по нему
  if (e.target.dataset.action === "plus") {
    const newAmount = amount + 1;
    span.innerHTML = newAmount;
  }
}

// разукрашиваем элементы списка
function colorLabel(e) {
  // получаем родителя таргета, это список дополнений
  const parentNode = e.target.closest(".calculator__additions-item");
  // проверяем, что клик прошёл по элементу внутри списка с data-action "checked"
  if (e.target.dataset.action === "checked") {
    const span = parentNode.querySelector(".hidden__checkbox");
    parentNode.classList.toggle("addition__checked");
    span.classList.toggle("show__checkbox");
  }
}

// слушатели событий
inputRange.addEventListener("input", getTotalCost);
selectPlace.addEventListener("change", countSquareCost);
compaundData.addEventListener("click", subtraction);
compaundData.addEventListener("click", addition);
additionsList.addEventListener("click", colorLabel);
extrasList.addEventListener("click", getTotalCost);
