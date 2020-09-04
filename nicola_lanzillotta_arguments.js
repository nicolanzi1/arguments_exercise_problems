function sum1() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }

    return total;
}

console.log(sum1(1, 2, 3, 4));
console.log(sum1(1, 2, 3, 4, 5));

function sum2(...nums) {
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
    }

    return total;
}

console.log(sum2(1, 2, 3, 4));
console.log(sum2(1, 2, 3, 4, 5));


Function.prototype.myBind1 = function (ctx) {
    const fn = this;
    const bindArgs = Array.from(arguments).slice(1);
    return function _boundfn() {
        const callArgs = Array.from(arguments);
        return fn.apply(ctx, bindArgs.concat(callArgs));
    };
};

Function.prototype.myBind2 = function (ctx, ...bindArgs) {
    return (...callArgs) => this.apply(ctx, bindArgs.concat(callArgs));
};

class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}

const markov = new Cat("Markov");
const pavlov =  new Dog("Pavlov");

markov.says("meow", "Ned");
markov.says.myBind1(pavlov, "meow", "Kush")();
markov.says.myBind1(pavlov)("meow", "a tree");
markov.says.myBind1(pavlov, "meow")("Markov");

markov.says.myBind2(pavlov, "meow", "Kush")();
markov.says.myBind2(pavlov)("meow", "a tree");
markov.says.myBind2(pavlov, "meow")("Markov");

const notMarkovSays = markov.says.myBind1(pavlov);
notMarkovSays("meow", "me");

const notMarkovSays2 = markov.says.myBind2(pavlov);
notMarkovSays2("meow", "me");


function curriedSum(numArgs) {
    const numbers = [];

    function _curriedSum(num) {
        numbers.push(num);

        if (numbers.length === numArgs) {
            let total = 0;
            
            numbers.forEach((n) => { total += n; });

            return total;
        } else {
            return _curriedSum;
        }
    }

    return _curriedSum;
}

const sum = curriedSum(4);
console.log(sum(5)(30)(20)(1));


// Spread
Function.prototype.curry = function (numArgs) {
    const args = [];
    const fn = this;

    function _curriedFn(arg) {
        args.push(arg);

        if (args.length === numArgs) {
            return fn(...args);
        } else {
            return _curriedFn;
        }
    }

    return _curriedFn
};

// Apply
Function.prototype.curry1 = function (numArgs) {
    const args = [];
    const fn = this;
    function _curriedFn(arg) {
        args.push(arg);
        if (args.length === numArgs) {
            return fn.apply(null, args);
        } else {
            return _curriedFn;
        }
    }
    return _curriedFn;
};

// Arrow func
Function.prototype.curry2 = function (nArg) {
    const argArray = [];
    const _curriedFn = (arg) => {
        argArray.push(arg);
        if (argArray.length === nArg) {
            return this(...argArray);
        } else {
            return _curriedFn;
        }
    };
    return _curriedFn;
};