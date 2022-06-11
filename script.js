const showVal = function (newVal) {
  console.log(newVal);
  document.querySelector(".small-range").textContent = newVal;
  return newVal;
};

const button = document.querySelector(".btn");
const resultEl = document.getElementById("result");
const clipboard = document.querySelector("#clipboard");

clipboard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

button.addEventListener("click", function () {
  const length = document.querySelector(".range").value;
  const upperCase = document.querySelector("#uppper-case").checked;
  const lowerCase = document.querySelector("#lower-case").checked;
  const number = document.querySelector("#number").checked;
  const symbol = document.querySelector("#symbol").checked;

  resultEl.innerText = generatePassword(
    lowerCase,
    upperCase,
    number,
    symbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  // Doesn't have a selected type
  if (typesCount === 0) {
    alert("Select atleast one case from setting.");
    return "";
  }

  // create a loop
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
