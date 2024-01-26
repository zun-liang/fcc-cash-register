const userInput = document.getElementById("cash") as HTMLInputElement;
const purchaseBtn = document.getElementById(
  "purchase-btn"
) as HTMLButtonElement;
const changeDue = document.getElementById("change-due") as HTMLDivElement;
const priceSpan = document.getElementById("price") as HTMLSpanElement;

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

const result = cid.map((change) => {
  switch (change[0]) {
    case "PENNY":
      return [0.01, change[1], Math.round(change[1] / 0.01)];
    case "NICKEL":
      return [0.05, change[1], Math.round(change[1] / 0.05)];
    case "DIME":
      return [0.1, change[1], Math.round(change[1] / 0.1)];
    case "QUARTER":
      return [0.25, change[1], Math.round(change[1] / 0.25)];
    case "ONE":
      return [1, change[1], Math.round(change[1] / 1)];
    case "FIVE":
      return [5, change[1], Math.round(change[1] / 5)];
    case "TEN":
      return [10, change[1], Math.round(change[1] / 10)];
    case "TWENTY":
      return [20, change[1], Math.round(change[1] / 20)];
    case "ONE HUNDRED":
      return [100, change[1], Math.round(change[1] / 100)];
  }
});

// const result = [
//   [0.01, 1.01, 101],
//   [0.05, 2.05, 41],
//   [0.1, 3.1, 31],
//   [0.25, 4.25, 17],
//   [1, 90, 90],
//   [5, 55, 11],
//   [10, 20, 2],
//   [20, 60, 3],
//   [100, 100, 1],
// ];

const changeInDrawerTotal: number = parseFloat(
  result
    .map((change) => change[1])
    .reduce((change, sum) => change + sum, 0)
    .toFixed(2)
);

priceSpan.textContent = `Total: $${price}`;

const findChange = (change: number) => {
  let remainingChange = change;
  let changeArr = [];
  let updatedCid = [];
  for (let i = result.length - 1; i >= 0; i--) {
    if (remainingChange >= result[i][0]) {
      let changeGiveOut =
        remainingChange >= result[i][1]
          ? result[i][1]
          : parseFloat(
              (
                Math.floor(remainingChange / result[i][0]) * result[i][0]
              ).toFixed(2)
            );
      remainingChange = parseFloat(
        (remainingChange - changeGiveOut).toFixed(2)
      );
      changeArr.push(`${cid[i][0]}: $${changeGiveOut}`);
      updatedCid.unshift(
        `${cid[i][0]}: $${parseFloat((cid[i][1] - changeGiveOut).toFixed(2))}`
      );
    }
  }
  console.log(updatedCid);
  return changeArr;
};

const purchase = () => {
  let cash: number = parseFloat(userInput.value);
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  } else {
    const changeReturn = parseFloat((cash - price).toFixed(2));
    if (changeInDrawerTotal === changeReturn) {
      const arr = findChange(changeReturn);
      changeDue.innerHTML = `<span>Status: CLOSED</span>`;
      for (let i = 0; i < arr.length; i++) {
        changeDue.innerHTML += `<span>${arr[i]}</span>`;
      }
    } else if (changeInDrawerTotal < changeReturn) {
      changeDue.innerHTML = `<span>Status: INSUFFICIENT_FUNDS</span>`;
    } else {
      const arr = findChange(changeReturn);
      changeDue.innerHTML = `<span>Status: OPEN</span>`;
      for (let i = 0; i < arr.length; i++) {
        changeDue.innerHTML += `<span>${arr[i]}</span>`;
      }
    }
  }
};

purchaseBtn.addEventListener("click", purchase);
