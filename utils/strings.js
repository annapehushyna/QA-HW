export function capitalize(str) {
    console.log(str[0].toUpperCase() + str.slice(1).toLowerCase());
  }
  
  export function truncate(str, n) {
    if (str.length <= n) return str;
    console.log(str.slice(0, n) + "...");
  }