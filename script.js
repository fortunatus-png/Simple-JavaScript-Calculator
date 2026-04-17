const input = document.getElementById("input");
const buttons = document.getElementById("buttons");
const btns = buttons.querySelectorAll("button");

let result = "", operator = "", info = "";

const addition = (res, input) =>  Number(res) + Number(input);
const subtraction = (res, input) =>  Number(res) - Number(input);
const multiplication = (res, input) =>  Number(res) * Number(input);
const division = (res, input) =>  Number(res) / Number(input);
const reminder = (res, input) =>  Number(res) % Number(input);

function setMaxLength() {
    if(!isNaN(input.value)) {
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
}

window.addEventListener("resize", setMaxLength);

const calculateResult = (res, op, input) => {
    if(res !== "" && input !== "") {
        if(op === "/" && Number(input) === 0) {
            info = "No division by zero";
            input = info;
            res = "";
            return input;
        }

        if(op === "+") {
            input = addition(res, input);
        } else if(op === "-") {
            input = subtraction(res, input);
        }  else if(op === "*") {
            input = multiplication(res, input);
        }  else if(op === "/") {
            input = division(res, input);
        }  else if(op === "%") {
            input = reminder(res, input);
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
        info = "No negative numbers";
        input = info;
    }
    return input;
};

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const btnText = btn.innerText;
        setMaxLength();

        if(btnText === "C") {
            input.value = handleClear(input.value);
            return;
        } else if(btnText === "⇐") {
            input.value = handleDelete(input.value);
            return;
        } else if(btnText === "√") {
            input.value = handleSqrt(input.value);
            return;
        } else if(/[-*\/%+]/.test(btnText)) {
            // Save-Operator
            result = input.value;
            operator = btnText;
            input.value = "";
            return;
        } else if(btnText === "=") {
            input.value = calculateResult(result, operator, input.value);
            result = "";
            return;
        } else {
            if(input.value === info) {
                input.value = "";
            }
            if(btnText === "." && input.value.includes(".")) return;
            input.value += btnText;
        }
    });
});

document.addEventListener("keydown", (e) => {
    let key = e.key;
    if ("Shift" === e.key) return;

    if(/^(-|\*|\/|%|\+|\d|Delete|Backspace|Enter|s|.)$/.test(key)) {
        e.preventDefault();
        setMaxLength();

        // Clear-Button
        if(key === "Delete") {
            input.value = handleClear(input.value);
            return;
        } else if(key === "Backspace") {
            input.value = handleDelete(input.value);
            return;
        } else if(key === "s") {
            input.value = handleSqrt(input.value);
            return;
        } else if(/[-*\/%+]/.test(key)) {
            // Save-Operator
            result = input.value;
            operator = key;
            input.value = "";
            return;
        } else if(key === "Enter") {
            input.value = calculateResult(result, operator, input.value);
            result = "";
            return;
        } else {
            if(input.value === info) {
                input.value = "";
            }
            if(key === "." && input.value.includes(".")) return;
            input.value += key;
        }
    } else {
        alert("Please use only the calculator keys('√' is 's')");
    } 
});