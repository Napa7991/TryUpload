
const gridContainer = document.querySelector(".grid");
const outputDiv = document.getElementById('outputDiv');
const houseOutputDiv = document.getElementById('houseOutputDiv')
const bookBtn = document.querySelector(".bookBtn");

const numbers = [];

const btnSingleDiv = document.getElementById("btnSingle");
const btnHouseDiv = document.getElementById("btnHouse");
const btnEndingDiv = document.getElementById("btnEnding");

for (let i = 0; i < 100; i++) {
  numbers.push(i);
}
for (let number of numbers) {
  const numberElement = document.createElement("div");
  numberElement.classList.add("numberDiv");
  numberElement.textContent = number;

  gridContainer.appendChild(numberElement);
}

const numberElementDiv = document.querySelectorAll(".numberDiv");

let lastTapElement = null;

let row = 10;
let col = 10;

let storedValue=[] ;
let houseStoredValue;

numberElementDiv.forEach((element, index) => {
  // storing element as number for future use
  let numberElement = parseInt(element.textContent);

  // function for double click on single
  const doubleClick = () => {
    houseStoredValue = "Single";
    if (element === lastTapElement) {
      storedValue.pop(element.innerText);
      // storedValue=[];
      element.classList.toggle("active");
    } else {
      element.classList.add("active");
      lastTapElement = element;
      storedValue.push(parseInt(element.innerText));
    }

  };

  //  function for double click on house/row
  const rowDoubleClick = () => {
    let rowIndex = Math.floor(numberElement / col);
    storedValue=[];
    houseStoredValue="";

    numberElementDiv.forEach((element, index) => {
      if (Math.floor(index / col) === rowIndex) {
        element.classList.toggle("active");
        storedValue.push(parseInt(element.innerText));
        houseStoredValue="House";
      }
     
    });
  };

  // function for Column click on ending/column
  const colDoubleClick = ()=>{
    let colIndex = Math.floor(numberElement%10);

    storedValue=[];
    houseStoredValue="";

    numberElementDiv.forEach((element,index)=>{
      if(Math.floor(index%col)===colIndex){
        element.classList.toggle('active');
        storedValue.push(parseInt(element.innerText));
        houseStoredValue="Ending"
      }
    })
  }

  element.addEventListener("click", () => {
    if (btnSingleDiv.classList.contains("active")) {
      doubleClick();
    } else if (btnHouseDiv.classList.contains("active")) {
      removeSelected();

   
      rowDoubleClick();
    } else if (btnEndingDiv.classList.contains("active")) {
      removeSelected();

      colDoubleClick();
    }
  });
});

//  function to remove selected digits when move to single/house/ending
const removeSelected = () => {
  lastTapElement = null;
  numberElementDiv.forEach((element) => {
    element.classList.remove("active");
  });
};

// Function to create hover effect in Houses

btnSingleDiv.addEventListener("click", () => {
  removeSelected();
  btnSingleDiv.classList.add("active");
  btnHouseDiv.classList.remove("active");
  btnEndingDiv.classList.remove("active");
});
btnHouseDiv.addEventListener("click", () => {
  removeSelected();

  btnSingleDiv.classList.remove("active");
  btnHouseDiv.classList.add("active");
  btnEndingDiv.classList.remove("active");
});
btnEndingDiv.addEventListener("click", () => {
  removeSelected();

  btnSingleDiv.classList.remove("active");
  btnHouseDiv.classList.remove("active");
  btnEndingDiv.classList.add("active");
});

bookBtn.addEventListener("click",()=>{

  outputDiv.innerText=storedValue;
  houseOutputDiv.innerText = houseStoredValue;

})
