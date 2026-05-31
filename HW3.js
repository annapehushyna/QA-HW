function sumNumbers(arr) {
    let result = 0;
    
    for (let element of arr) {
        result += element;
    }
    
    return result;
}

console.log(sumNumbers([1, 2, 3, 4, 5])); 


function filterByLetter(names){
    const filteredNames = names.filter(element => element.toLowerCase().startsWith("а"));
    return filteredNames;
}
console.log(filterByLetter(["андрій", "Богдан", "Аліна", "Олег", "Антон"]));


function squarePositive(arr) {
    const newArr = [];
    
    for (let element of arr) {
        if (element <= 0) {
            continue; 
        }
        newArr.push(element ** 2); 
    }
    
    return newArr;
}

console.log(squarePositive([1, -2, 3, -4, 5]))


function getCheapProducts(arr) {
    const newArr = []; 
    
    for (let element of arr) { 
        if (element.price < 100) { 
            newArr.push(element.name); 
        }
    }
    return newArr;
}

var products = [
    { name: "Ноутбук", price: 25000 },
    { name: "Ручка",   price: 15 },
    { name: "Олівець", price: 8 },
    { name: "Монітор", price: 8000 }
];

console.log(getCheapProducts(products)); 



function getStats(arr){
    const newObj ={};
    newObj.min = Math.min(...arr);
    newObj.max = Math.max(...arr);
    let TotalSum = 0;
    for (const number of arr){
        TotalSum +=number
    }
    newObj.sum = TotalSum;
    const average = arr.reduce((sum, num) => sum + num, 0) / arr.length;
    const roundedAverage = Number(average.toFixed(2));
    newObj.avg = roundedAverage;
    return newObj;
}
console.log(getStats([3, 7, 1, 9, 4]));



function sortByGrade(arr){
    const newArr = [...arr].sort((a,b) => b.grade - a.grade).map(student => student.name)
        return newArr;
    }
    var students = [
        { name: "Іван",    grade: 72 },
        { name: "Оксана",  grade: 95 },
        { name: "Михайло", grade: 88 },
        { name: "Дарина",  grade: 79 }
    ];
    console.log(sortByGrade(students));
    


    function mergeUnique(arr1, arr2){
        const combinedArr = arr1.concat(arr2);
        const sortedArr = combinedArr.filter((item,index) => combinedArr.indexOf(item) === index).sort((a,b) => a - b);
        return sortedArr;
    }
    console.log(mergeUnique([5, 3, 1], [3, 5, 7]));
    console.log(mergeUnique([2, 2, 4], [4, 6]));


    function checkEmail(person){
        if(Object.hasOwn(person, "email")){
            console.log(`Email: ${person.email}`);
        }
        else{
            person.email = "not indicated";
            console.log(`Email ${person.email}, added default value`);
        }
    }
    var person1 = { name: "Джон",  age: 30, email: "john@example.com" };
    var person2 = { name: "Марія", age: 25 };
    
    checkEmail(person1);
    checkEmail(person2);
    console.log(person2);


    function groupByLength(words){
        return Object.groupBy(words, word => word.length);
    }
    console.log(groupByLength(["cat", "dog", "elephant", "rat", "ox", "emu"]));


    function getOrderReport(orders){
        return orders.map(order => {const orderTotal = order.items.reduce((sum, item) => sum + item.price, 0);
        const maxPrice = Math.max(...order.items.map(item => item.price));
        const mostExpensiveItem = order.items.find(item => item.price === maxPrice);
        return {
            customer:order.customer,
            totalPrice:orderTotal,
            itemCount:order.items.length,
            mostExpensive: mostExpensiveItem.name,
        }
        }).sort((a,b) => b.totalPrice - a.totalPrice)
    };
    var orders = [
        {
            id: 1,
            customer: "Богдан",
            items: [
                { name: "Мишка",     price: 150 },
                { name: "Кабель USB", price: 50 }
            ]
        },
        {
            id: 2,
            customer: "Оксана",
            items: [
                { name: "Клавіатура", price: 800 },
                { name: "Мишка",      price: 300 },
                { name: "Килимок",    price: 250 }
            ]
        },
        {
            id: 3,
            customer: "Іванка",
            items: [
                { name: "Кабель USB", price: 50 }
            ]
        }
    ];
    console.log(getOrderReport(orders));
    
 