function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function run(){
    console.log("Start");
    await delay(1000);
    console.log("Step 1");
    await delay(500);
    console.log("Step 2");
    console.log("The end")
}
run()


function fetchUser(id) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (id === 1) resolve({ id: 1, name: "Ivan" });
            else          reject(new Error("User not found"));
        }, 500);
    });
}

async function getUser(id) {
    try {
        const user = await fetchUser(id);
        const result = `User: ${user.name}`;
        console.log(result);
        return result;
    } catch (error) {
        const result = `Error: ${error.message}`;
        console.log(result);
        return result;
    }
}

getUser(1); 
getUser(99);


function getUsers()    { return new Promise(r => setTimeout(() => r("Users"), 1000)); }
function getProducts() { return new Promise(r => setTimeout(() => r("Goods"),       800));  }
function getOrders()   { return new Promise(r => setTimeout(() => r("Orders"),   600));  }

async function loadAll() {
    var start = Date.now();

    const results = await Promise.all([getUsers(), getProducts(), getOrders()]);
    console.log(results);

    console.log("Time:", Date.now() - start, "ms");
}

loadAll();

var slowRequest = new Promise(r => setTimeout(() => r("Slow request"), 1500));
var fastRequest  = new Promise(r => setTimeout(() => r("Fast request"),   300));

function withTimeout(promise, ms) {

    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Timeout!")), ms);
    });

    return Promise.race([promise, timeoutPromise]);
}


withTimeout(slowRequest, 500)
    .then(r  => console.log(r))
    .catch(e => console.log(e.message));




    withTimeout(fastRequest, 2000)
    .then(r  => console.log(r))
    .catch(e => console.log(e.message));





    var attempt = 0;
function unstable() {
    attempt++;
    console.log(`Attempt ${attempt}...`);
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (attempt < 3) reject(new Error("Fail"));
            else             resolve("Data received");
        }, 300);
    });
}

async function retryRequest(fn, retries) {
    for (let i =1; i <= retries; i++){
        try{
        return await fn();
        } catch(error){
        if (i === retries){
            throw new Error ("All attempts are used");
        }
        }
}
    }


retryRequest(unstable, 5)
    .then(r  => console.log("Result:", r))
    .catch(e => console.log("Error:", e.message));



    function fetchItem(id) {
        return new Promise(r => setTimeout(() => r({ id, data: `item_${id}` }), 400));
    }
    
    async function batchRequests(ids, batchSize) {
        const allResults = [];
    
        for (let i = 0; i < ids.length; i += batchSize) {
            const batch = ids.slice(i, i + batchSize);
            console.log("Packet:", batch);
    
            const batchPromises = batch.map(id => fetchItem(id));
    
            const batchResults = await Promise.all(batchPromises);
    
            allResults.push(...batchResults);
        }
    
        return allResults;
    }
    
    batchRequests([1, 2, 3, 4, 5], 2)
        .then(results => console.log("All data:", results));