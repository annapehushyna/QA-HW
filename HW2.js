let age;
if(age <12){
    console.log("child")
}
else if(age <=17){
    console.log("teenager")
}
else if(age<=64){
    console.log("adult")
}
else{
    console.log("pensioner")
}

age = 13
score = 85
switch (true) {
case (score>=90): 
    console.log("A") 
    break;
case (score>=70): 
    console.log("B") 
    break;
case (score>=50): 
    console.log("C") 
    break;
case (score>=0): 
    console.log("F") 
    break;
}
let month =7
switch(month){
    case 12:
    case 1:
    case 2:
        console.log("Winter");
        break;
    case 3:
    case 4:
    case 5:
        console.log("Spring");
        break;
    case 6:
    case 7:
    case 8:
        console.log("Summer");
        break;
    case 9:
    case 10:
    case 11:
        console.log("Fall");
        break;
}
    
    
for (let i = 1; i <= 30; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } 
    else if (i % 3 === 0) {
        console.log("fizz");
    } 
    else if (i % 5 === 0) {
        console.log("Buzz");
    } 
    else {
        console.log(i);
    }
}

let n = 91;
let x = 2; 

while (x <= n) {
    if (n % x === 0) {
    
        break; 
    }
    x++; 
}

console.log("Найменший дільник: " + x);

for (let a =1; a <=100; a++){
    let res = String(a)
    if (res.includes('3') || res.includes('7')){
        console.log(res)
    }
}

for (let y = 1; y <= 100; y++) {
    let converted = String(y);
    
    if (converted.includes("3") || converted.includes("7")) {
        continue;
    }

    console.log(y);
}

function greet (name= "guest", greeting = "Hi"){
    console.log(name, greeting)
}

let operation =  "multiply";
function calculation(operation){
switch(operation){
        case("add"):
            return function add(a, b){
                return a+b;
            }
            break;
        case("subtract"):
            return function subtract(a, b){
                return a-b;

        }
        break;
        case("multiply"):
            return function multiply(a, b){
                return a*b;
        }
        break;
        case("divide"):
            return function divide(a, b){
                if (b === 0) {
                    return "Cannot divide by zero";
                }
                return a/b;
        }
        break;
    }
}
   let mathAction = calculation(operation)
    console.log(mathAction(6, 7))

    function repeatAction(n, actionFunction) {
        for (let x = 1; x < n; x++) {
            actionFunction(x, n);
        }
    }
    
    function myFunction(i, total) {
        console.log("step " + i + ` from ${total}`);
    }
    
    repeatAction(9, myFunction);

    function generatePassword(n = 8) {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        
        for (let i = 0; i < n; i++) {
            let randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }
        
        console.log(result);
    }
    
    generatePassword(9);

    