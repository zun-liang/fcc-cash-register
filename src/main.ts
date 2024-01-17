const userInput = document.getElementById("cash") as HTMLInputElement;
const purchaseBtn = document.getElementById(
  "purchase-btn"
) as HTMLButtonElement;
const changeDue = document.getElementById("change-due") as HTMLDivElement;

let price: number = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const purchase = () => {
  let cash: number = parseFloat(userInput.value);
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  }
};

purchaseBtn.addEventListener("click", purchase);
