export function clamp(val, min, max) {
    console.log(Math.min(Math.max(val, min), max));
  }
  
  export function randomInt(min, max) {
    
    console.log(Math.floor(Math.random() * (max - min + 1)) + min);
  }