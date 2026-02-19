const input = document.getElementById("input");
const buttons = document.getElementById("buttons");
const btns = buttons.querySelectorAll("button");

const addition = (array) =>  Number(array[0]) + Number(array[2]);
const subtraction = (array) => Number(array[0]) - Number(array[2]);
const multiplication = (array) =>  Number(array[0]) * Number(array[2]);
const division = (array) => Number(array[0]) / Number(array[2]);
const reminder = (array) => Number(array[0]) % Number(array[2]);

function setMaxLength() {
    if(window.matchMedia("(max-width: 600px)").matches) {
        if(input.value.length > 13) {
            input.value = input.value.slice(0, 13);
        }
    } else if(window.matchMedia("(max-width: 700px)").matches) {
        if(input.value.length > 15) {
            input.value = input.value.slice(0, 15);
        }
    } else if(window.matchMedia("(max-width: 960px)").matches) {
        if(input.value.length > 29) {
            input.value = input.value.slice(0, 29);
        }
    } else {
        if(input.value.length > 50) {
            input.value = input.value.slice(0, 50);
        }
    }
}

window.addEventListener("resize", setMaxLength);

const handleOperation = (btnText, input) => {
    let array = [];
    if(input !== "") {
        array = [input, btnText];
    }
    return array;
};

const calculateResult = (arr, input) => {
    if(arr.length >= 2 && input !== "") {
        arr.push(input);

        if(arr[1] === "/" && Number(arr[2]) === 0) {
            input = "Division by zero is impossible";
            arr = [];
            return;
        }

        if(arr[1] === "+") {
            input = addition(arr);
        } else if(arr[1] === "-") {
            input = subtraction(arr);
        }  else if(arr[1] === "×") {
            input = multiplication(arr);
        }  else if(arr[1] === "/") {
            input = division(arr);
        }  else if(arr[1] === "%") {
            input = reminder(arr);
        }  
        return input;  
    }
};

let arr = [];
btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const btnText = btn.innerText;

        setMaxLength();

        // Clear-Button
        if(btnText === "C") {
            input.value = "";
            arr = [];
            return;
        } else if(btnText === "⇐") {
            input.value = input.value.slice(0, -1);
            return;
        } else if(btnText === "√") {
            if(input.value !== "" && Number(input.value) >= 0) {
                input.value = Math.sqrt(Number(input.value));
            } else {
                input.value = "No negative numbers";
            }
            return;
        }else if(/[-×\/%+]/.test(btnText)) {
            // Save-Operator
            arr = handleOperation(btnText, input.value);
            input.value = "";
            return;
        } else if(btnText === "=") {
            input.value = calculateResult(arr, input.value);
            arr = [];
            return;
        }else {
            input.value += btnText;
        }
    });
});