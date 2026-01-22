const baseURL = "https://v6.exchangerate-api.com/v6/def2b0218f439805ecb1a88b/latest/";

const dropdowns = document.querySelectorAll(".dropdowns select");
const btn = document.querySelector("form button");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryData) {
    let newOption = document.createElement("option");
    newOption.innerText = countryData[currCode].currencyName;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener('change', (evt) => {
    updateFlag(evt.target);
    const curr = evt.target.value;
    console.log('Selected currency code (the key):', curr);
  
  });
}


const updateFlag = (evt) => {
  let currCode = evt.value;  
  let flagInfo = countryData[currCode];
  if (flagInfo) {
    let countryCode = flagInfo.flagCode;
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = evt.parentElement.querySelector("img");
    if (img) img.src = newSrc;
  }
}


btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector("form input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = 1;
  }
  let fromCurr = fromSelect.value; 
  let toCurr = toSelect.value;     
  const URL = `${baseURL}${fromCurr}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.conversion_rates[toCurr];
  let finalAmount = (amtVal * rate).toFixed(2);
  msg.innerText = `${amtVal} ${countryData[fromCurr].currencyName} = ${finalAmount} ${countryData[toCurr].currencyName}`;
});


window.addEventListener("load", () => {
  updateFlag(fromSelect);
  updateFlag(toSelect);
  btn.click(); 
});



