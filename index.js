function myEach(collection, callback) {
    const values = Array.isArray(collection) ? collection : Object.values(collection);

    for (let i = 0; i < values.length; i++) {
        const shouldContinue = callback(values[i], i, collection); // Call the callback for each element
        if (shouldContinue === false) break; // Stop iterating if the callback returns false
    }
    return collection;
}

// myMap: Creates a new array populated with the results of calling a provided function on every element in the calling array.
function myMap(collection, callback) {
    const result = [];
    myEach(collection, (value, index) => {
        result.push(callback(value, index, collection)); // Populate result array
    });
    return result; // Return the new array
}

// myFilter: Creates a new array with all elements that pass the test implemented by the provided function.
function myFilter(collection, predicate) {
    const result = [];
    myEach(collection, (value, index) => {
        if (predicate(value, index, collection)) {
            result.push(value); // Add to result if predicate is true
        }
    });
    return result; // Return the filtered array
}

// mySize: Returns the size of the collection (number of elements for arrays or number of keys for objects).
function mySize(collection) {
    return Array.isArray(collection) ? collection.length : Object.keys(collection).length; // Return size based on type
}

// myFirst: Returns the first element or first n elements of the collection.
function myFirst(collection, n = 1) {
    return n > 1 ? collection.slice(0, n) : collection[0];
}

// myLast: Returns the last element or last n elements of the collection.
function myLast(collection, n = 1) {
    return n > 1 ? collection.slice(-n) : collection[collection.length - 1];
}

// myKeys: Returns an array of a given object's own enumerable property names.
function myKeys(obj) {
    return Object.keys(obj); // Use Object.keys to get keys
}

// myValues: Returns an array of a given object's own enumerable property values.
function myValues(obj) {
    return Object.values(obj);
}

// myReduce: Applies a function against an accumulator and each element in the collection (from left to right) to reduce it to a single value.
function myReduce(collection, callback, accumulator) {
    let hasAccumulator = arguments.length === 3;

    myEach(collection, (value) => {
        if (!hasAccumulator) {
            accumulator = value;
            hasAccumulator = true;
        } else {
            accumulator = callback(accumulator, value);
        }
    });

    return accumulator;
}

// myFind: Returns the value of the first element in the collection that passes the test implemented by the provided function. Otherwise, undefined is returned.
function myFind(collection, predicate) {
    let result;

    myEach(collection, (value, index) => {
        if (predicate(value, index, collection)) {
            result = value;
            return false;
        }
    });

    return result;
}

// Example Usage
const arr = [1, 2, 3, 4, 5];
const obj = { a: 1, b: 2, c: 3 };

myEach(arr, (value) => console.log(value));
const doubled = myMap(arr, (value) => value * 2);
console.log(doubled);

const evens = myFilter(arr, (value) => value % 2 === 0);
console.log(evens);

console.log(mySize(arr));
console.log(mySize(obj));
console.log(myFirst(arr));
console.log(myFirst(arr, 2));

console.log(myLast(arr));
console.log(myLast(arr, 2));

console.log(myKeys(obj));
console.log(myValues(obj));

const sum = myReduce(arr, (accumulator, value) => accumulator + value, 0);
console.log(sum);

const found = myFind(arr, (value) => value > 3);
console.log(found);