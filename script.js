const input = document.getElementById("input");
const buttons = document.getElementById("buttons");
const btns = buttons.querySelectorAll("button");

let arr = [];

const addition = (array) =>  Number(array[0]) + Number(array[2]);
const subtraction = (array) => Number(array[0]) - Number(array[2]);
const multiplication = (array) =>  Number(array[0]) * Number(array[2]);
const division = (array) => Number(array[0]) / Number(array[2]);
const reminder = (array) => Number(array[0]) % Number(array[2]);

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const btnText = btn.innerText;

        // Clear-Button
        if(btnText === "C") {
            input.value = "";
            arr = [];
            return;
        }

        // Delete char by char 
        if(btnText === "⇐") {
            input.value = input.value.slice(0, -1);
            return;
        }

        if(btnText === "√") {
            input.value = Math.sqrt(Number(input.value));
            return;
        }
        
        if(btnText === "+" || btnText === "-" || btnText === "×" || btnText === "/" || btnText === "%" || btnText === "=") {
            if(btnText === "=") {
                if(arr.length >= 2 && input.value !== "") {
                    arr.push(input.value);
                    if(arr[1] === "+") {
                        input.value = addition(arr);
                    } else if(arr[1] === "-") {
                        input.value = subtraction(arr);
                    }  else if(arr[1] === "×") {
                        input.value = multiplication(arr);
                    }  else if(arr[1] === "/") {
                        input.value = division(arr);
                    }  else if(arr[1] === "%") {
                        input.value = reminder(arr);
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