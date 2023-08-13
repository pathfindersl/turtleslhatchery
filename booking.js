let ValueticketTotalCal = 0;
let ValueshowSelections = 0;
let ValuesaveDateToLocalStorage = 0;
let ValuesaveLocationToLocalStorage = 0;
let fillCheck = 0;



        // Function to handle storing the selected value in local storage
        function saveLocationToLocalStorage() {
            const locationSelect = document.getElementById("locationSelect");
            const selectedValue = locationSelect.value;
            if (selectedValue !== "default") {
                localStorage.setItem("selectedLocation", selectedValue);
            }
            console.log("Selected location: " + selectedValue);

            if(selectedValue === "default"){
                ValuesaveLocationToLocalStorage = 0;
                console.log(ValuesaveLocationToLocalStorage);
            } else{
                ValuesaveLocationToLocalStorage = 1;
                console.log(ValuesaveLocationToLocalStorage);
            }

            optionCheck(ValueticketTotalCal, ValueshowSelections, ValuesaveDateToLocalStorage, ValuesaveLocationToLocalStorage);

            document.querySelector('.location-sumy').innerHTML = `${selectedValue}`;

        }

        // Function to load the selected value from local storage
        function loadLocationFromLocalStorage() {
            const locationSelect = document.getElementById("locationSelect");
            const selectedLocation = localStorage.getItem("selectedLocation");
            if (selectedLocation) {
                locationSelect.value = selectedLocation;
            }
        }

        // Load the selected value from local storage on page load
        loadLocationFromLocalStorage();


         // Function to handle storing the selected date in local storage
    function saveDateToLocalStorage() {
        const dateInput = document.getElementById("dateInput");
        const selectedDate = dateInput.value;
        localStorage.setItem("selectedDate", selectedDate);
        console.log("Selected date: " + selectedDate);
        
        ValuesaveDateToLocalStorage = 1;
        console.log(ValuesaveDateToLocalStorage);

        optionCheck(ValueticketTotalCal, ValueshowSelections, ValuesaveDateToLocalStorage, ValuesaveLocationToLocalStorage);

        document.querySelector('.date-sumy').innerHTML = `${selectedDate}`;
    }

    // Get the current date and calculate the date three months from now
    const today = new Date();
    const threeMonthsFromNow = new Date(today);
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    // Format the dates in the 'yyyy-MM-dd' format for setting the min and max attributes of the input
    const formattedToday = formatDate(today);
    const formattedThreeMonthsFromNow = formatDate(threeMonthsFromNow);

    // Set the min and max attributes of the input to restrict date selection
    const dateInput = document.getElementById("dateInput");
    dateInput.setAttribute("min", formattedToday);
    dateInput.setAttribute("max", formattedThreeMonthsFromNow);

    // Helper function to format dates in 'yyyy-MM-dd' format
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Add event listener to the date input to save the selected date to local storage when changed
    dateInput.addEventListener("change", saveDateToLocalStorage);


    document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", showSelections);
    });
});

function showSelections() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let selectedPeakHours = 0;
    let selectedNormalHours = 0;
    let lowerTime = null;
    let highestTime = null;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const timeSlot = checkbox.value.split('-');
            const startTime = parseInt(timeSlot[0]);
            const endTime = parseInt(timeSlot[1]);

            if (lowerTime === null || startTime < lowerTime) {
                lowerTime = startTime;
            }

            if (highestTime === null || endTime > highestTime) {
                highestTime = endTime;
            }

            if (startTime >= 10 && endTime <= 13) {
                selectedPeakHours += (endTime - startTime);
            } else if (startTime >= 15 && endTime <= 18) {
                selectedPeakHours += (endTime - startTime);
            } else {
                selectedNormalHours += (endTime - startTime);
            }
        }
    });

    console.log(`Selected Lower Time: ${lowerTime}:00`);
    console.log(`Selected Highest Time: ${highestTime}:00`);
    console.log(`Selected Peak Hours: ${selectedPeakHours}`);
    console.log(`Selected Normal Hours: ${selectedNormalHours}`);

    document.querySelector('.time-sumy').innerHTML = `${lowerTime}:00 to ${highestTime}:00`;
    document.querySelector('.duration-sumy').innerHTML = `Duration : ${selectedNormalHours + selectedPeakHours} hours. (Normal :${selectedNormalHours} / Peak :${selectedPeakHours})`;

    // Store selections in local storage
    localStorage.setItem("lowerTime", `${lowerTime}:00`);
    localStorage.setItem("highestTime", `${highestTime}:00`);
    localStorage.setItem("selectedPeakHours", selectedPeakHours);
    localStorage.setItem("selectedNormalHours", selectedNormalHours);

    ValueshowSelections = 1;
    console.log(ValueshowSelections);

    optionCheck(ValueticketTotalCal, ValueshowSelections, ValuesaveDateToLocalStorage, ValuesaveLocationToLocalStorage);
}


    let counts = [0, 0, 0, 0, 0];

// Function to update the count and display the result
function updateCount(index) {
const countElement = document.getElementById(`count${index}`);
countElement.textContent = counts[index];
localStorage.setItem(getVisitorString(index), counts[index]);

document.querySelector('.SL-adult-count').innerHTML = `(${counts[0]})`;
document.querySelector('.SL-child-count').innerHTML = `(${counts[1]})`;
document.querySelector('.F-adult-count').innerHTML = `(${counts[2]})`;
document.querySelector('.F-child-count').innerHTML = `(${counts[3]})`;
document.querySelector('.infant-count').innerHTML = `(${counts[4]})`;

document.querySelector('.SL-adult').innerHTML = `$${ticketsCalculatorSLadult(0)}`;
document.querySelector('.SL-child').innerHTML = `$${ticketsCalculatorSLChild(1)}`;
document.querySelector('.F-adult').innerHTML = `$${ticketsCalculatorFadult(2)}`;
document.querySelector('.F-child').innerHTML = `$${ticketsCalculatorFchild(3)}`;
document.querySelector('.infant').innerHTML = `Free`;

const totalSLAdult = ticketsCalculatorSLadult(0);
const totalSLChild = ticketsCalculatorSLChild(1);
const totalFAdult = ticketsCalculatorFadult(2);
const totalFChild = ticketsCalculatorFchild(3);
const totalInfant = ticketsCalculatorInfant(4);

localStorage.setItem('totalSLAdult', totalSLAdult);
localStorage.setItem('totalSLChild', totalSLChild);
localStorage.setItem('totalFAdult', totalFAdult);
localStorage.setItem('totalFChild', totalFChild);
localStorage.setItem('totalInfant', totalInfant);

const totalTicketPrice = ticketTotalCal(counts);
localStorage.setItem('totaltktprice', totalTicketPrice);
document.querySelector('.tkt-tot').innerHTML = `<b>$${totalTicketPrice}</b>`;

}

// Function to increase the count for the given category
function increaseCount(index) {
counts[index]++;
updateCount(index);
}

// Function to decrease the count for the given category
function decreaseCount(index) {
if (counts[index] > 0) {
    counts[index]--;
    updateCount(index);
}
}

// Function to get the visitor string with count for the given category
function getVisitorString(index) {
const categories = ["SL Adult", "SL Child", "Foreigner Adult", "Foreigner Child", "Infant"];
return `${categories[index]}`;
}

// Update counts and display on page load
for (let i = 0; i < counts.length; i++) {
updateCount(i);
}

function ticketsCalculatorSLadult(index){
const count = localStorage.getItem(getVisitorString(index));
const peakHours = localStorage.getItem('selectedPeakHours');
const normHours = localStorage.getItem('selectedNormalHours');
    const slAdultpeakcal = count * peakHours * 6;

    const slAdultnormcal = count * normHours * 4;

    const slAdultTotcal = slAdultnormcal + slAdultpeakcal;
return slAdultTotcal;  

}

function ticketsCalculatorSLChild(index){
const count = localStorage.getItem(getVisitorString(index));
const peakHours = localStorage.getItem('selectedPeakHours');
const normHours = localStorage.getItem('selectedNormalHours');
const slChildpeakcal = count * peakHours * 3;

const slChildnormcal = count * normHours * 2;

const slChildTotcal = slChildnormcal + slChildpeakcal;
return slChildTotcal;  
}

function ticketsCalculatorFadult(index){
const count = localStorage.getItem(getVisitorString(index));
const peakHours = localStorage.getItem('selectedPeakHours');
const normHours = localStorage.getItem('selectedNormalHours');
const Fadultpeakcal = count * peakHours * 13;

const Fadultnormcal = count * normHours * 10;

const FadultTotcal = Fadultnormcal + Fadultpeakcal;
return FadultTotcal;  
}

function ticketsCalculatorFchild(index){
const count = localStorage.getItem(getVisitorString(index));
const peakHours = localStorage.getItem('selectedPeakHours');
const normHours = localStorage.getItem('selectedNormalHours');
const Fchildpeakcal = count * peakHours * 8;

const Fchildnormcal = count * normHours * 5;

const FchildTotcal = Fchildnormcal + Fchildpeakcal;
return FchildTotcal;  
}

function ticketsCalculatorInfant(index){
const count = localStorage.getItem(getVisitorString(index));
const peakHours = localStorage.getItem('selectedPeakHours');
const normHours = localStorage.getItem('selectedNormalHours');
const Infantpeakcal = count * peakHours * 0;

const Infantnormcal = count * normHours * 0;

const InfantTotcal = Infantnormcal + Infantpeakcal;
return InfantTotcal;  
}

function ticketTotalCal(counts) {
const totSLadulttkt = ticketsCalculatorSLadult(0, counts[0]);
const totSLChildtkt = ticketsCalculatorSLChild(1, counts[1]);
const totFadulttkt = ticketsCalculatorFadult(2, counts[2]);
const totFchildtkt = ticketsCalculatorFchild(3, counts[3]);
const totInfanttkt = ticketsCalculatorInfant(4, counts[4]);

const total = totSLadulttkt + totSLChildtkt + totFadulttkt + totFchildtkt + totInfanttkt;

if(total > 0){
    ValueticketTotalCal = 1;
    console.log(ValueticketTotalCal);
}else{
    ValueticketTotalCal = 0;
    console.log(ValueticketTotalCal);
}

 optionCheck(ValueticketTotalCal, ValueshowSelections, ValuesaveDateToLocalStorage, ValuesaveLocationToLocalStorage);
return total;
}

function optionCheck(ValueticketTotalCal, ValueshowSelections, ValuesaveDateToLocalStorage, ValuesaveLocationToLocalStorage) {
    console.log("ValueticketTotalCal:", ValueticketTotalCal);
    console.log("ValueshowSelections:", ValueshowSelections);
    console.log("ValuesaveDateToLocalStorage:", ValuesaveDateToLocalStorage);
    console.log("ValuesaveLocationToLocalStorage:", ValuesaveLocationToLocalStorage);

    fillCheck = ValueticketTotalCal + ValueshowSelections + ValuesaveDateToLocalStorage + ValuesaveLocationToLocalStorage;

    console.log(fillCheck);

    buttonEnableDisable();
}

function buttonEnableDisable() {
        const myButton = document.getElementById("trial");
            if (fillCheck === 4) {
                myButton.disabled = false;
            } else {
                myButton.disabled = true;
            }
        console.log("go home");
    }

    function redirectToPage() {
        window.location.href = 'detail.html';
    } 

    

    const checkOptionsButton = document.getElementById("trial");
    checkOptionsButton.addEventListener("click", optionCheck);


    function continueWithPurchase() {
        // Save the necessary information to local storage
        localStorage.setItem("selectedLocation", document.querySelector('.location-sumy').textContent);
        localStorage.setItem("selectedDate", document.querySelector('.date-sumy').textContent);
        localStorage.setItem("selectedTime", document.querySelector('.time-sumy').textContent);
        localStorage.setItem("selectedDuration",document.querySelector('.duration-sumy').textContent);
        localStorage.setItem("SLAdultCount", document.querySelector('.SL-adult-count').textContent);
        localStorage.setItem("SLChildCount", document.querySelector('.SL-child-count').textContent);
        localStorage.setItem("FAdultCount", document.querySelector('.F-adult-count').textContent);
        localStorage.setItem("FChildCount", document.querySelector('.F-child-count').textContent);
        localStorage.setItem("InfantCount", document.querySelector('.infant-count').textContent);
        localStorage.setItem("SL-adult", document.querySelector('.SL-adult').textContent);
        localStorage.setItem("SL-child", document.querySelector('.SL-child').textContent);
        localStorage.setItem("F-adult", document.querySelector('.F-adult').textContent);
        localStorage.setItem("F-child", document.querySelector('.F-child').textContent);
        localStorage.setItem("infant", document.querySelector('.infant').textContent);
        localStorage.setItem("tkt-tot", document.querySelector('.tkt-tot').textContent);
        
        
    }

    // Add event listener to the "Continue With Purchase" button
    const continueButton = document.getElementById("trial");
    continueButton.addEventListener("click", continueWithPurchase);