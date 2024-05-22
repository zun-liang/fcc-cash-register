const userInput = document.getElementById("cash") as HTMLInputElement;
const purchaseBtn = document.getElementById(
  "purchase-btn"
) as HTMLButtonElement;
const changeDue = document.getElementById("change-due") as HTMLDivElement;
const priceSpan = document.getElementById("price") as HTMLSpanElement;
const screenDiv = document.getElementById("screen") as HTMLDivElement;

type Currency = [string, number];

let price: number = 1.87;
let cid: Currency[] = [
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

type Result = [number, number, number];

let result: Result[] = cid.map((change): Result => {
  switch (change[0]) {
    case "PENNY":
      return [0.01, change[1], parseFloat((change[1] / 0.01).toFixed(2))];
    case "NICKEL":
      return [0.05, change[1], parseFloat((change[1] / 0.05).toFixed(2))];
    case "DIME":
      return [0.1, change[1], parseFloat((change[1] / 0.1).toFixed(2))];
    case "QUARTER":
      return [0.25, change[1], parseFloat((change[1] / 0.25).toFixed(2))];
    case "ONE":
      return [1, change[1], parseFloat((change[1] / 1).toFixed(2))];
    case "FIVE":
      return [5, change[1], parseFloat((change[1] / 5).toFixed(2))];
    case "TEN":
      return [10, change[1], parseFloat((change[1] / 10).toFixed(2))];
    case "TWENTY":
      return [20, change[1], parseFloat((change[1] / 20).toFixed(2))];
    case "ONE HUNDRED":
      return [100, change[1], parseFloat((change[1] / 100).toFixed(2))];
    default:
      return [0, 0, 0];
  }
});

const changeInDrawerTotal: number = parseFloat(
  result
    .map((change) => change[1])
    .reduce((change, sum) => change + sum, 0)
    .toFixed(2)
);

priceSpan.textContent = `Total: $${price}`;

for (let i = 0; i < cid.length; i++) {
  const nthChild = screenDiv
    .querySelector(`:nth-child(${i + 2})`)
    ?.querySelector("span");
  if (nthChild) {
    nthChild.textContent = String(cid[i][1]);
  }
}

type ChangeResult = [string[], number[]];

const findChange = (change: number): ChangeResult => {
  let remainingChange = change;
  let changeArr: string[] = [];
  let updatedCid: number[] = [];
  let resultArr: ChangeResult = [[], []];

  for (let i = result.length - 1; i >= 0; i--) {
    if (remainingChange >= result[i][0] && result[i][1] !== 0) {
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
      updatedCid.unshift(parseFloat((cid[i][1] - changeGiveOut).toFixed(2)));
      result[i][1] = parseFloat((cid[i][1] - changeGiveOut).toFixed(2));
    } else {
      updatedCid.unshift(cid[i][1]);
    }
  }
  if (remainingChange === 0) {
    resultArr[0] = changeArr;
    resultArr[1] = updatedCid;
  }
  return resultArr;
};

const purchase = () => {
  let cash: number = parseFloat(userInput.value);
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  } else {
    const changeReturn = parseFloat((cash - price).toFixed(2));
    if (changeInDrawerTotal < changeReturn) {
      changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    } else {
      const resultArr = findChange(changeReturn);
      if (resultArr[0].length === 0) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
      } else {
        const arr = resultArr[0];
        const arrCid = resultArr[1];
        changeDue.innerHTML =
          changeInDrawerTotal === changeReturn
            ? `<span>Status: CLOSED</span>`
            : `<span>Status: OPEN</span>`;
        for (let i = 0; i < arr.length; i++) {
          changeDue.innerHTML += `<span>${arr[i]}</span>`;
        }
        for (let i = 0; i < arrCid.length; i++) {
          cid[i][1] = arrCid[i];
          const nthChild = screenDiv
            .querySelector(`:nth-child(${i + 2})`)
            ?.querySelector("span");
          if (nthChild) {
            nthChild.textContent = String(arrCid[i]);
          }
        }
      }
    }
  }
  userInput.value = "";
};

purchaseBtn.addEventListener("click", purchase);
