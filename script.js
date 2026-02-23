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
        }  else if(arr[1] === "*") {
            input = multiplication(arr);
        }  else if(arr[1] === "/") {
            input = division(arr);
        }  else if(arr[1] === "%") {
            input = reminder(arr);
        }  
        return input;  
    }
};

const handleDelete = (input) => {
    input = input.slice(0, -1);
    return input;
};

const handleClear = (input) => {
    return input = "";
};

const handleSqrt = (input) => {
    if(input !== "" && Number(input) >= 0) {
        input = Math.sqrt(Number(input));
    } else {
        input = "No negative numbers";
    }
    return input;
};

let arr = [];
btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const btnText = btn.innerText;

        setMaxLength();

        // Clear-Button
        if(btnText === "C") {
            input.value = handleClear(input.value);
            arr = [];
            return;
        } else if(btnText === "⇐") {
            input.value = handleDelete(input.value);
            return;
        } else if(btnText === "√") {
            input.value = handleSqrt(input.value);
            return;
        } else if(/[-*\/%+]/.test(btnText)) {
            // Save-Operator
            arr = handleOperation(btnText, input.value);
            input.value = "";
            return;
        } else if(btnText === "=") {
            input.value = calculateResult(arr, input.value);
            arr = [];
            return;
        } else {
            input.value += btnText;
        }
    });
});

document.addEventListener("keydown", (e) => {
    let key = e.key;
  
    if ("Shift" === e.key) return;

    if(/^(-|\*|\/|%|\+|\d|Delete|Backspace|Enter|s|.)$/.test(key)) {
        console.log(e.key)
        e.preventDefault();
        setMaxLength();

        // Clear-Button
        if(key === "Delete") {
            input.value = handleClear(input.value);
            arr = [];
            return;
        } else if(key === "Backspace") {
            input.value = handleDelete(input.value);
            return;
        } else if(key === "s") {
            input.value = handleSqrt(input.value);
            return;
        } else if(/[-*\/%+]/.test(key)) {
            // Save-Operator
            arr = handleOperation(key, input.value);
            input.value = "";
            return;
        } else if(key === "Enter") {
            input.value = calculateResult(arr, input.value);
            arr = [];
            return;
        } else {
            input.value += key;
        }
    } else {
        alert("Please use only the calculator keys('√' is 's')");
    }
    
});