document
  .getElementById("buy-ticket-btn")
  .addEventListener("click", function () {
    const section = document.getElementById("bus-layout");
    section.scrollIntoView({ behavior: "smooth" });
    section.classList.add("highlight");
    setTimeout(() => section.classList.remove("highlight"), 2000);
  });

//getting the seat button in script//

const seatBtns = document.querySelectorAll(".seat-btn");
const selectedSeatsTable = document.querySelector("#selected-seats tbody");
let selectedSeats = [];

function handleSeatBtnClick(event) {
  const btn = event.target;

  if (btn.classList.contains("selected")) {
    alert("You have already selected this seat.");
    return;
  }

  if (selectedSeats.length >= 4) {
    alert("You can select a maximum of 4 seats.");
    return;
  }

  btn.classList.add("selected");
  btn.style.backgroundColor = "#1DD100";
  btn.style.color = "#fff";

  const seatId = btn.id;
  const seatClass = "Economy";
  const seatPrice = 550;

  selectedSeats.push({ id: seatId, class: seatClass, price: seatPrice });
  updateSelectedSeatsTable();
}

function updateSelectedSeatsTable() {
  selectedSeatsTable.innerHTML = "";

  selectedSeats.forEach(seat => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${seat.id}</td>
      <td>${seat.class}</td>
      <td>${seat.price}</td>
    `;
    selectedSeatsTable.appendChild(row);
  });

  const totalSeats = selectedSeats.length;
  const totalPrice = totalSeats * 550;
  totalPrice.id = "totalPrice";

  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td>Total Seats: ${totalSeats}</td>
    <td></td>
    <td>Total Price: ${totalPrice}</td>
  `;
  selectedSeatsTable.appendChild(totalRow);
  
}



seatBtns.forEach(btn => {
  btn.addEventListener("click", handleSeatBtnClick);
});

//applying coupon code//
const input = document.getElementById("input");
const applybtn = document.getElementById("applybtn");
const grandTotal = document.getElementById("gtotal");

const updateTotalElement = document.getElementById("totalPrice"); 
const totalPrice = parseFloat(updateTotalElement.innerText); // Ensure this is correctly parsed

function checkCondition() {
  // console.log(input.value); // Debugging: Check the input value
  
  if (input.value === "New15" || input.value === "Couple20") {
    applybtn.disabled = false; // Enable the button
  } else {
    applybtn.disabled = true; // Disable the button
  }
}

function calculateDiscount() {
  let discount = 0;
  if (input.value === "New15") {
    discount = totalPrice * 0.15;
  } else if (input.value === "Couple20") {
    discount = totalPrice * 0.20;
  }
  const discountedPrice = totalPrice - discount;
  grandTotal.innerText = `BDT ${discountedPrice.toFixed(2)}`; // Update the grand total with formatting
}

// Add event listeners
input.addEventListener("input", checkCondition);
applybtn.addEventListener("click", calculateDiscount);
