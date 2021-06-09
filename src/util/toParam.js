function censor(censor) {
    let cache = [];
  
    return function(key, value) {
      if (typeof value === 'object' && value !== null) {
        // Duplicate reference found, discard key
        if (cache.includes(value)) return;
    
        // Store value in our collection
        cache.push(value);
      }
      return value; 
    }
  }

export default function toParam(obj) {
    return JSON.parse(JSON.stringify(obj, censor(obj)));
};

