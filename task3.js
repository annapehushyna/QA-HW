async function calculate(a, b) {
    console.log("Calculator is loading...");
    try {
        
        const module = await import('./calculator.js');
        const calculator = module.default;

        console.log("Calculator loaded successfully!");

        console.log( calculator.add(a, b));
        console.log(calculator.subtract(a, b));
        console.log( calculator.multiply(a, b));

        console.log(calculator.divide(a, b));

    } catch (error) {

        console.error("An error occurred during calculation:", error.message);
    }
    
}

calculate(10, 3);
calculate(10, 0);