// // --------------- ПЕРЕМЕННЫЕ ----------------------------------------
// const STORAGE_LABEL_EXPENSES = "expenses"; // ключ для хранения расходов в localStorage
// let LIMIT = localStorage.getItem("LIMIT") ? parseInt(localStorage.getItem("LIMIT")) : 10000; // лимит для расходов
// const CURRENCY = "руб."; // определение валюты
// const STATUS_IN_LIMIT = "всё хорошо";
// const STATUS_IN_LIMIT_CLASSNAME = "info__status__value"; // класс с нужным цветом для статуса в лимите
// const STATUS_OUT_OF_LIMIT = "лимит превышен"; // статус превышения лимита
// const STATUS_OUT_OF_LIMIT_CLASSNAME = "info__status__value_bad"; // модификатор цвета превышения лимита
// const limitNode = document.querySelector(".info__spent__heading-limit__value"); // лимит расходов
// const statusNode = document.querySelector(".js-info__status__value"); // статус

// const currencyNode = document.querySelector(".js-currency"); // валюта
// const expenseInputSumNode = document.querySelector(
//   ".js-expense__inputs__input-sum"
// ); // поле ввода 1 траты
// const expenseAddBtnNode = document.querySelector(".js-expense__btn-add"); // кнопка добавить 1 трату
// const historyNode = document.querySelector(".js-info__history"); // история трат
// const spentTotalNode = document.querySelector(
//   ".js-info__spent__heading-total__sum"
// ); // сумма расходов
// const resetBtn = document.querySelector(".js-expenses-accounting__btn-reset"); // кнопка сброса расходов

// const categoriesExpensesListNode = document.querySelector(
//   ".js-expenses__categories"
// );
// const popupOpenNode = document.querySelector(".js-popup-open");
// const popupNode = document.querySelector(".js-popup");
// const popupCloseNode = document.querySelector(".js-popup-close");
// const popupInputNode = document.querySelector(".js-popup__input");
// const popupBtnNode = document.querySelector(".js-popup__btn");
// // Загружаем расходы из localStorage или создаем пустой массив
// const expenses = JSON.parse(localStorage.getItem(STORAGE_LABEL_EXPENSES)) || [];

// currencyNode.innerText = CURRENCY; // валюта

// init(expenses); // инициализация

// expenseAddBtnNode.addEventListener("click", function () {
//   // события после клика на кнопку добавить 1 трату
//   const expense = getExpenseFromUser();
//   if (!expense) {
//     return;
//   }
//   trackExpense(expense);
//   render(expenses);
// });

// resetBtn.addEventListener("click", function () {
//   // события после клика на кнопку "Сбросить расходы"
//   // Очищаем массив расходов
//   expenses.length = 0;

//   // Обновляем интерфейс
//   spentTotalNode.innerText = 0; // устанавливаем сумму трат на 0
//   historyNode.innerHTML = ""; // очищаем историю трат
//   statusNode.innerText = STATUS_IN_LIMIT; // восстанавливаем статус
//   statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME); // удаляем статус превышения лимита
// });

// popupOpenNode.addEventListener("click", function () {
//   // события после клика на иконку редактирования лимита
//   popupNode.style.display = "flex";
// });

// popupCloseNode.addEventListener("click", function () {
//   popupNode.style.display = "none";
// });

// popupBtnNode.addEventListener("click", function () {
//   let newLimit = parseInt(popupInputNode.value);
//   if (isNaN(newLimit) || newLimit <= 0) {
//     alert("Пожалуйста, введите корректное значение для лимита.");
//     return;
//   }
//   LIMIT = newLimit; // Обновляем текущий лимит
//   limitNode.innerText = newLimit; // Обновляем отображаемый лимит
//   localStorage.setItem("LIMIT", newLimit);
//   render(expenses); // Обновляем статус и историю трат
//   popupNode.style.display = "none"; // закрываем попап
// });

// // --------ФУНКЦИИ------------------------------------------------------------------------
// function init(expenses) {
//   limitNode.innerText = LIMIT; // Отображаем текущий лимит
//   statusNode.innerText = STATUS_IN_LIMIT;
//   spentTotalNode.innerText = calculateExpenses(expenses);
// }

// function saveExpensesToStorage() {
//   const expensesString = JSON.stringify(expenses);
//   localStorage.setItem(STORAGE_LABEL_EXPENSES, expensesString);
// }

// function trackExpense(expense) {
//   expenses.push(expense);
//   saveExpensesToStorage();
// }

// function getExpenseFromUser() {
//   // Получаем значение из поля ввода 1 траты
//   if (!expenseInputSumNode.value) {
//     // запрет на добавление пустого значения поля 1 траты
//     return null; // остановка действия, чтобы нельзя было добавить пустое значение
//   }
//   const amount = parseInt(expenseInputSumNode.value);
//   if (isNaN(amount) || amount <= 0) {
//     alert("Введите корректное значение суммы!");
//     return null;
//   }
//   const category = categoriesExpensesListNode.value;
//   if (category === "Выберите категорию") {
//     alert("Выберите категорию из списка!");
//     return null;
//   }
//   clearInput();
//   return { amount, category };
// }

// function clearInput() {
//   expenseInputSumNode.value = ""; // очищение поле ввода 1 траты после добавления 1 траты
// }

// function calculateExpenses(expenses) {
//   // подсчёт всех трат
//   return expenses.reduce((sum, element) => sum + element.amount, 0);
// }

// function render(expenses) {
//   // отображение трат
//   const sum = calculateExpenses(expenses);
//   renderHistory(expenses);
//   renderSum(sum);
//   renderStatus(sum);
// }

// function renderHistory(expenses) {
//   let expensesListHTML = ""; // список трат для записи в историю трат в html
//   const category = categoriesExpensesListNode.innerText;
//   expenses.forEach((element) => {
//     // цикл формирует список трат
//     expensesListHTML += `<li class='info__history__data'>${element.amount} ${CURRENCY} — ${element.category}</li>`;
//   });

//   historyNode.innerHTML = `<ol class='info__history__dates'>${expensesListHTML}</ol>`; // внесение списка трат в html
// }

// function renderSum(sum) {
//   // Считаем и выводим на экран сумму расходов
//   spentTotalNode.innerText = sum;
// }

// function renderStatus(sum) {
//   // 5. Сравниваем с лимитом и выводим статус
//   if (sum <= LIMIT) {
//     statusNode.innerText = STATUS_IN_LIMIT;
//     statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
//   } else {
//     const differenceOfBalance = sum - LIMIT; // находим разницу между расходами и лимитом
//     // выводим статус с разницей
//     statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (-${differenceOfBalance} ${CURRENCY})`;
//     statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
//   }
// }

// --------------- ПЕРЕМЕННЫЕ ----------------------------------------
const STORAGE_LABEL_EXPENSES = "expenses"; // ключ для хранения расходов в localStorage
let LIMIT = localStorage.getItem("LIMIT") ? parseInt(localStorage.getItem("LIMIT")) : 10000; // лимит для расходов
const CURRENCY = "руб."; // определение валюты
const STATUS_IN_LIMIT = "всё хорошо";
const STATUS_IN_LIMIT_CLASSNAME = "info__status__value"; // класс с нужным цветом для статуса в лимите
const STATUS_OUT_OF_LIMIT = "лимит превышен"; // статус превышения лимита
const STATUS_OUT_OF_LIMIT_CLASSNAME = "info__status__value_bad"; // модификатор цвета превышения лимита

const limitNode = document.querySelector(".info__spent__heading-limit__value"); // лимит расходов
const statusNode = document.querySelector(".js-info__status__value"); // статус

const currencyNode = document.querySelector(".js-currency"); // валюта
const expenseInputSumNode = document.querySelector(".js-expense__inputs__input-sum"); // поле ввода 1 траты
const expenseAddBtnNode = document.querySelector(".js-expense__btn-add"); // кнопка добавить 1 трату
const historyNode = document.querySelector(".js-info__history"); // история трат
const spentTotalNode = document.querySelector(".js-info__spent__heading-total__sum"); // сумма расходов
const resetBtn = document.querySelector(".js-expenses-accounting__btn-reset"); // кнопка сброса расходов
const categoriesExpensesListNode = document.querySelector(".js-expenses__categories"); // категории расходов
const popupOpenNode = document.querySelector(".js-popup-open"); // кнопка открыть попап
const popupNode = document.querySelector(".js-popup"); // попап для редактирования лимита
const popupCloseNode = document.querySelector(".js-popup-close"); // кнопка закрыть попап
const popupInputNode = document.querySelector(".js-popup__input"); // поле ввода лимита
const popupBtnNode = document.querySelector(".js-popup__btn"); // кнопка сохранить новый лимит

// Загружаем расходы из localStorage или создаем пустой массив
const expenses = JSON.parse(localStorage.getItem(STORAGE_LABEL_EXPENSES)) || [];

currencyNode.innerText = CURRENCY; // валюта
init(expenses); // инициализация

expenseAddBtnNode.addEventListener("click", function () {
  const expense = getExpenseFromUser();
  if (!expense) {
    return;
  }
  trackExpense(expense);
  render(expenses);
});

resetBtn.addEventListener("click", function () {
  // события после клика на кнопку "Сбросить расходы"
  expenses.length = 0; // Очищаем массив расходов
  localStorage.removeItem(STORAGE_LABEL_EXPENSES); // Удаляем из localStorage
  
  // Обновляем интерфейс
  spentTotalNode.innerText = 0; // устанавливаем сумму трат на 0
  historyNode.innerHTML = ""; // очищаем историю трат
  statusNode.innerText = STATUS_IN_LIMIT; // восстанавливаем статус
  statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME); // удаляем статус превышения лимита
});

popupOpenNode.addEventListener("click", function () {
  popupNode.style.display = "flex"; // показываем попап
});

popupCloseNode.addEventListener("click", function () {
  popupNode.style.display = "none"; // скрываем попап
});

popupBtnNode.addEventListener("click", function () {
  let newLimit = parseInt(popupInputNode.value);
  if (isNaN(newLimit) || newLimit <= 0) {
    alert("Пожалуйста, введите корректное значение для лимита.");
    return;
  }
  LIMIT = newLimit; // обновляем текущий лимит
  limitNode.innerText = newLimit; // обновляем отображаемый лимит
  localStorage.setItem("LIMIT", newLimit); // сохраняем новый лимит в localStorage
  render(expenses); // обновляем статус и историю трат
  popupNode.style.display = "none"; // закрываем попап
});

// --------ФУНКЦИИ------------------------------------------------------------------------
function init(expenses) {
  limitNode.innerText = LIMIT; // отображаем текущий лимит
  statusNode.innerText = STATUS_IN_LIMIT; // устанавливаем начальный статус
  spentTotalNode.innerText = calculateExpenses(expenses); // устанавливаем начальную сумму
  renderHistory(expenses); // отображаем существующие расходы, если есть
}

function saveExpensesToStorage() {
  localStorage.setItem(STORAGE_LABEL_EXPENSES, JSON.stringify(expenses)); // сохраняем массив расходов в localStorage
}

function trackExpense(expense) {
  expenses.push(expense); // добавляем новую трату
  saveExpensesToStorage(); // сохраняем изменения в localStorage
}

function getExpenseFromUser() {
  // получаем значение из поля ввода 1 траты
  if (!expenseInputSumNode.value) {
    return null; // запрещаем добавление пустого значения
  }
  const amount = parseInt(expenseInputSumNode.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Введите корректное значение суммы!");
    return null;
  }
  const category = categoriesExpensesListNode.value;
  if (category === "Выберите категорию") {
    alert("Выберите категорию из списка!");
    return null;
  }
  clearInput();
  return { amount, category }; // возвращаем объект с суммой и категорией
}

function clearInput() {
  expenseInputSumNode.value = ""; // очищаем поле ввода после добавления
}

function calculateExpenses(expenses) {
  // подсчет всех трат
  return expenses.reduce((sum, element) => sum + element.amount, 0);
}

function render(expenses) {
  // отображение трат
  const sum = calculateExpenses(expenses);
  renderHistory(expenses); // обновляем историю
  renderSum(sum); // обновляем сумму расходов
  renderStatus(sum); // обновляем статус
}

function renderHistory(expenses) {
  let expensesListHTML = ""; // список трат для записи в историю
  expenses.forEach((element) => {
    // цикл формирует список трат
    expensesListHTML += `<li class='info__history__data'>${element.amount} ${CURRENCY} — ${element.category}</li>`;
  });

  historyNode.innerHTML = `<ol class='info__history__dates'>${expensesListHTML}</ol>`; // вносим список трат в HTML
}

function renderSum(sum) {
  // показываем и выводим на экран сумму расходов
  spentTotalNode.innerText = sum;
}

function renderStatus(sum) {
  // 5. сравниваем с лимитом и выводим статус
  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT; // текущий статус в лимите
    statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME); // убираем класс ошибки
  } else {
    const differenceOfBalance = sum - LIMIT; // вычисляем разницу между расходами и лимитом
    // выводим статус с разницей
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (-${differenceOfBalance} ${CURRENCY})`;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME); // добавляем класс ошибки
  }
}