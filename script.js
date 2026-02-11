const input = document.getElementById("input");
const buttons = document.getElementById("buttons");
const btns = buttons.querySelectorAll("button");

let arr = [];
let lastOperator = "";

const addition = (array) =>  Number(array[0]) + Number(array[2]);
const subtraction = (array) => Number(array[0]) - Number(array[2]);

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const btnText = btn.innerText;

        // Clear-Button
        if(btnText === "C") {
            input.value = "";
            arr = [];
            return;
        }
        
        if(btnText === "+" || btnText === "-" || btnText === "=") {
            if(btnText === "=") {
                if(arr.length >= 2 && input.value !== "") {
                    arr.push(input.value);
                    if(arr[1] === "+") {
                        input.value = addition(arr);
                    } else if(arr[1] === "-") {
                        input.value = subtraction(arr);
                    }
                    arr = [];   
                }
            } else {
                // Save operator
                if(input.value !== "") {
                    arr = [input.value, btnText];
                    input.value = "";
                }
            }
            return;
        }
        // Number-Buttons
        input.value += btnText;
    });
});