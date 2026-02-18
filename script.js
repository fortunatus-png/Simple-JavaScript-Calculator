const input = document.getElementById("input");
const buttons = document.getElementById("buttons");
const btns = buttons.querySelectorAll("button");

let arr = [];

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

const handleOperation = (btnText) => {
    if(input.value !== "") {
        arr = [input.value, btnText];
        input.value = "";
    }
};

const calculateResult = () => {
    if(arr.length >= 2 && input.value !== "") {
        arr.push(input.value);

        if(arr[1] === "/" && Number(arr[2]) === 0) {
            input.value = "Division by zero is impossible";
            arr = [];
            return;
        }

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
};

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const btnText = btn.innerText;

        setMaxLength();

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
            if(input.value !== "" && Number(input.value) >= 0) {
                input.value = Math.sqrt(Number(input.value));
            } else {
                input.value = "No negative numbers";
            }
            return;
        }
        
        if(btnText === "=") {
            calculateResult();
            return;
        } else if(/[-×\/%+]/.test(btnText)) {
            // Save-Operator
            handleOperation(btnText);
            return;
        }
        
        // Number-Buttons
        input.value += btnText;
    });
});