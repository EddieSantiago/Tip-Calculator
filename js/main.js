//Dom Elements
const billInput = document.querySelector("#input-bill")
const tipContainer = document.querySelector(".main__content-select")
const customTip = document.querySelector(".main__content-select__options-btn--custom")
const peopleInput = document.querySelector("#input-people")
const errorSpan = document.querySelector(".main__content-input__label-error")
const resetBtn = document.querySelector(".main__content-result__button");

//Result
const tipAmountSpan = document.querySelector("#tip-amount")
const totalSpan = document.querySelector("#total")

let tipAmount = 0, total = 0;

cargarAddEventsListener();

function cargarAddEventsListener() {
    billInput.addEventListener("keyup", function(){
        updateAmount();
    })

    peopleInput.addEventListener("keyup", function(){
        updateAmount();
    })

    customTip.addEventListener("keyup", function(e){
        //Update variable
        if (parseFloat(customTip.value) && customTip.value !== 0) {
            tipAmount = (customTip.value)/100;
        }

        updateAmount();
    })

    tipContainer.addEventListener("click", tipSelect)

    resetBtn.addEventListener("click", reset)
}

function updateAmount(){
    //Verify people fields
    if (parseFloat(peopleInput.value) && peopleInput.value !== 0 && peopleInput.value) {
        //Hide error
        errorSpan.style.display = "none";

        //Calculate the tip
        calculateTip();
    }else{
        //Show error
        errorSpan.style.display = "block";
    }

}

function tipSelect(e) {
    e.preventDefault();

    if(e.target.classList.contains("main__content-select__options-btn")){

        //Verify if is a input
        if (e.target.classList.contains("main__content-select__options-btn--custom")) {
            document.querySelector(".main__content-select__options-btn.active").classList.remove("active");
        }else{
            //Verify active
            if (document.querySelector(".main__content-select__options-btn.active")) {
                //Remove Active
                document.querySelector(".main__content-select__options-btn.active").classList.remove("active");
            }

            //Add Active
            e.target.classList.add("active");

            //Update variable
            tipAmount = parseFloat(e.target.getAttribute("data-percent"));

            updateAmount();
            }
    }
}

function calculateTip() {
    //Verificamos el bill
    if (billInput.value !== "" && parseFloat(billInput.value)) {

        //Tip Amount /person
        tipAmountForPerson = (billInput.value * tipAmount)/parseInt(peopleInput.value)

        //Total /person
        total = (billInput.value * (tipAmount + 1))/parseInt(peopleInput.value)

        //Round 2 decimals
        tipAmountForPerson = tipAmountForPerson.toFixed(2);
        total = total.toFixed(2)

        //Update Spans
        tipAmountSpan.innerText = "$" + tipAmountForPerson;
        totalSpan.innerText = "$" + total;
    }
}

function reset(e) {
    e.preventDefault();

    //Reset Variables
    tipAmount = 0;
    total = 0;

    billInput.value = "";
    tipAmountSpan.innerText = "$0.00";

    peopleInput.value = "";
    totalSpan.innerText = "$0.00"

    customTip.value = "";
    document.querySelector(".main__content-select__options-btn.active").classList.remove("active")

    errorSpan.style.display = "none";
    
}