/*
1. Реалізувати клас Phone (таска з заняття).
Властивості: марка, модель, колір, ціна, рік випуску.
Метод: розрахунок віку телефона.

Створити екземпляр класу, викликати для нього метод.

Реалізувати сеттер для року виробництва з валідацією та відповідний геттер. 
*Для перевірки, чи належить рік виробництва певному діапазону, можна 
використати клас нижче.
*/

class Phone {
  constructor(mark, model, color, price, year) {
    this.range = new RangeValidator(2000, new Date().getFullYear());
    this.mark = mark;
    this.model = model;
    this.color = color;
    this.price = price;
    this.year = year;
  }

  getAge() {
    return new Date().getFullYear() - this.year;
  }

  get year() {
    return this._year;
  }
  set year(value) {
    if (typeof value !== "number") {
      throw new TypeError("age must be a number");
    }
    if (value < 0) {
      throw new RangeError(
        "Age must be bigger than 0 but smaller than 150 and it must be integer value."
      );
    }
    if (!this.range.isValid(value)) {
      throw new RangeError(`value ${value} is not valid`);
    }
    this._year = value;
  }
}

class RangeValidator {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  get from() {
    return this._from;
  }
  get to() {
    return this._to;
  }
  set from(value) {
    if (typeof value !== "number") {
      throw new TypeError("from must be number value");
    }

    if (value >= this._to) {
      throw new RangeError(`from must be less then ${this._to}`);
    }
    this._from = value;
  }
  set to(value) {
    if (typeof value !== "number") {
      throw new TypeError("to must be number value");
    }

    if (value <= this._from) {
      throw new RangeError(`to must be bigger then ${this._from}`);
    }
    this._to = value;
  }
  get range() {
    return [this._from, this._to];
  }

  isValid(value) {
    if (typeof value !== "number") {
      return false;
    }
    return value >= this._from && value <= this._to;
  }
}

const telephone1 = new Phone("Nokia", "3310", "black", 2000, 2010);
console.log(telephone1.getAge());
telephone1.year = 2021;

const range1 = new RangeValidator(1, 5.5); // Відпрацьовує
//const range2 = new RangeValidator(10, 5.5); // ПОМИЛКА! (оскільки має бути from <= to)

// Робота сетерів
range1.from = 5; // Відпрацьовує
//range1.from = 200; // ПОМИЛКА! (оскільки не має бути більше заданого вище в конструкторі to: 5.5)

range1.to = 80; // Відпрацьовує
//range1.to = -55; // ПОМИЛКА! (оскільки не має бути менше заданого вище from

// Робота гетерів
console.log(range1.from); // => 5
console.log(range1.to); // => 80

// Робота геттера range
console.log(range1.range); // => [5, 80]

// Робота validate
console.log(range1.isValid(10)); // => true (оскільки належить діапазону [5, 80])
console.log(range1.isValid(100)); // => false (оскільки не належить діапазону [5, 80])
