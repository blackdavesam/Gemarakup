class MathQuestion {
    constructor(level = 1) {
        this.level = parseInt(level);
        this.questionText = '';
        this.correctAnswer = 0;
        this.options = [];
        this.generateQuestion();
    }

    generateQuestion() {
        const operations = this.getAvailableOperations();
        const operation = operations[Math.floor(Math.random() * operations.length)];
        operation();
    }

    getAvailableOperations() {
        const ops = [];
        switch (this.level) {
            case 1:
                ops.push(() => this.generateSingleDigit('add'));
                ops.push(() => this.generateSingleDigit('subtract'));
                ops.push(() => this.generateSingleDigit('multiply'));
                break;
            case 2:
                ops.push(() => this.generateDoubleDigitNoCarry('add'));
                ops.push(() => this.generateDoubleDigitNoCarry('subtract'));
                ops.push(() => this.generateTimesTables('multiply'));
                ops.push(() => this.generateTimesTables('divide'));
                break;
            case 3:
                ops.push(() => this.generateDoubleDigitWithCarry('add'));
                ops.push(() => this.generateDoubleDigitWithCarry('subtract'));
                ops.push(() => this.generateDoubleBySingle('multiply'));
                ops.push(() => this.generateComplexDivisionNoRemainder());
                break;
            case 4:
                ops.push(() => this.generateTripleDigit('add'));
                ops.push(() => this.generateTripleDigit('subtract'));
                ops.push(() => this.generateDoubleByDouble('multiply'));
                ops.push(() => this.generateDivisionWithRemainder());
                break;
            case 5:
                ops.push(() => this.generateOrderOfOperations());
                break;
        }
        return ops;
    }

    // --- HELPER & GENERATOR FUNCTIONS --- //

    // Level 1
    generateSingleDigit(type) {
        let num1 = Math.floor(Math.random() * 9) + 1;
        let num2 = Math.floor(Math.random() * 9) + 1;
        if (type === 'subtract' && num1 < num2) [num1, num2] = [num2, num1]; // Ensure positive result

        switch (type) {
            case 'add':
                this.correctAnswer = num1 + num2;
                this.questionText = `What is ${num1} + ${num2}?`;
                break;
            case 'subtract':
                this.correctAnswer = num1 - num2;
                this.questionText = `What is ${num1} - ${num2}?`;
                break;
            case 'multiply':
                this.correctAnswer = num1 * num2;
                this.questionText = `What is ${num1} x ${num2}?`;
                break;
        }
        this.generateOptions(this.correctAnswer);
    }

    // Level 2
    generateDoubleDigitNoCarry(type) {
        let num1, num2;
        if (type === 'add') {
            let d1_1 = Math.floor(Math.random() * 8) + 1; // 1-8
            let d1_2 = Math.floor(Math.random() * 8) + 1;
            let d2_1 = Math.floor(Math.random() * (9 - d1_1)) + 1; // ensures no carry
            let d2_2 = Math.floor(Math.random() * (9 - d1_2)) + 1;
            num1 = d1_1 * 10 + d1_2;
            num2 = d2_1 * 10 + d2_2;
            this.correctAnswer = num1 + num2;
            this.questionText = `What is ${num1} + ${num2}?`;
        } else { // subtract
            let d1_1 = Math.floor(Math.random() * 8) + 2; // 2-9
            let d1_2 = Math.floor(Math.random() * 8) + 2;
            let d2_1 = Math.floor(Math.random() * (d1_1 - 1)) + 1; // ensures no borrow
            let d2_2 = Math.floor(Math.random() * (d1_2 - 1)) + 1;
            num1 = d1_1 * 10 + d1_2;
            num2 = d2_1 * 10 + d2_2;
            this.correctAnswer = num1 - num2;
            this.questionText = `What is ${num1} - ${num2}?`;
        }
        this.generateOptions(this.correctAnswer);
    }

    generateTimesTables(type) {
        const num1 = Math.floor(Math.random() * 11) + 2; // 2-12
        const num2 = Math.floor(Math.random() * 11) + 2; // 2-12
        if (type === 'multiply') {
            this.correctAnswer = num1 * num2;
            this.questionText = `What is ${num1} x ${num2}?`;
        } else { // divide
            this.correctAnswer = num1;
            this.questionText = `What is ${num1 * num2} ÷ ${num2}?`;
        }
        this.generateOptions(this.correctAnswer);
    }
    
    // Level 3
    generateDoubleDigitWithCarry(type) {
        let num1 = Math.floor(Math.random() * 90) + 10;
        let num2 = Math.floor(Math.random() * 90) + 10;
         if (type === 'subtract' && num1 < num2) [num1, num2] = [num2, num1];

        if(type === 'add') {
            this.correctAnswer = num1 + num2;
            this.questionText = `What is ${num1} + ${num2}?`;
        } else {
            this.correctAnswer = num1 - num2;
            this.questionText = `What is ${num1} - ${num2}?`;
        }
        this.generateOptions(this.correctAnswer);
    }

    generateDoubleBySingle(type) {
        const num1 = Math.floor(Math.random() * 90) + 10; // 10-99
        const num2 = Math.floor(Math.random() * 8) + 2; // 2-9
        this.correctAnswer = num1 * num2;
        this.questionText = `What is ${num1} x ${num2}?`;
        this.generateOptions(this.correctAnswer);
    }

    generateComplexDivisionNoRemainder() {
        const num2 = Math.floor(Math.random() * 8) + 2; // 2-9 divisor
        const result = Math.floor(Math.random() * 25) + 5; // 5-29 result
        const num1 = num2 * result;
        this.correctAnswer = result;
        this.questionText = `What is ${num1} ÷ ${num2}?`;
        this.generateOptions(this.correctAnswer);
    }

    // Level 4
    generateTripleDigit(type) {
        let num1 = Math.floor(Math.random() * 900) + 100;
        let num2 = Math.floor(Math.random() * 900) + 100;
         if (type === 'subtract' && num1 < num2) [num1, num2] = [num2, num1];
        
        if(type === 'add') {
            this.correctAnswer = num1 + num2;
            this.questionText = `What is ${num1} + ${num2}?`;
        } else {
            this.correctAnswer = num1 - num2;
            this.questionText = `What is ${num1} - ${num2}?`;
        }
        this.generateOptions(this.correctAnswer);
    }
    
    generateDoubleByDouble() {
        const num1 = Math.floor(Math.random() * 90) + 10; // 10-99
        const num2 = Math.floor(Math.random() * 90) + 10; // 10-99
        this.correctAnswer = num1 * num2;
        this.questionText = `What is ${num1} x ${num2}?`;
        this.generateOptions(this.correctAnswer);
    }

    generateDivisionWithRemainder() {
        const divisor = Math.floor(Math.random() * 10) + 3; // 3-12
        const dividend = Math.floor(Math.random() * 100) + 20; // 20-119
        if (dividend % divisor === 0) { // Avoid no remainder
            return this.generateDivisionWithRemainder(); // Recurse
        }
        const quotient = Math.floor(dividend / divisor);
        const remainder = dividend % divisor;
        this.correctAnswer = `${quotient} R ${remainder}`;
        this.questionText = `What is ${dividend} ÷ ${divisor}? (Include remainder)`;
        this.generateOptionsWithRemainder(quotient, remainder);
    }

    // Level 5
    generateOrderOfOperations() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const num3 = Math.floor(Math.random() * 10) + 2;
        this.correctAnswer = num1 + num2 * num3;
        this.questionText = `What is ${num1} + ${num2} x ${num3}?`;
        this.generateOptions(this.correctAnswer);
    }

    // --- OPTION GENERATION --- //
    generateOptions(answer) {
        this.options = [answer];
        while (this.options.length < 4) {
            const delta = Math.floor(Math.random() * 10) + 1;
            const sign = Math.random() < 0.5 ? -1 : 1;
            let wrongOption = answer + (delta * sign);
            if(wrongOption < 0) wrongOption = answer + delta;

            if (!this.options.includes(wrongOption)) {
                this.options.push(wrongOption);
            }
        }
        this.shuffleOptions();
    }

    generateOptionsWithRemainder(quotient, remainder) {
        this.options = [`${quotient} R ${remainder}`];
         while (this.options.length < 4) {
            let q = quotient + (Math.floor(Math.random() * 3) - 1);
            let r = remainder + (Math.floor(Math.random() * 3) - 1);
            if (q < 0) q = 0;
            if (r <= 0) r = 1;

            const wrongOption = `${q} R ${r}`;
            if (!this.options.includes(wrongOption)) {
                this.options.push(wrongOption);
            }
        }
        this.shuffleOptions();
    }

    shuffleOptions() {
        this.options.sort(() => Math.random() - 0.5);
    }
}