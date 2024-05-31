type DeprecationDescription = {
  reason: string;
  replaceMethod?: string;
};

function DeprecatedMethod(description: DeprecationDescription) {
  return function <T, A extends any[], R>(
    originalMethod: (...args: A) => R,
    context: ClassMethodDecoratorContext<T, (...args: A) => R>
  ) {
    if (context.kind !== 'method') throw new Error('Method-only decorator!');

    function replacementMethod(this: T, ...args: A): R {
      const message = `${context.name.toString()} is deprecated, because ${description.reason}.`;
      description.replaceMethod
        ? console.log(`${message} Use ${description.replaceMethod} instead.`)
        : console.log(message);
      return originalMethod.apply(this, args);
    }

    return replacementMethod;
  };
}

function MinStringLength(minValue: number) {
  return function <T>(originalMethod: (value: string) => void, context: ClassSetterDecoratorContext<T, string>) {
    if (context.kind !== 'setter') throw new Error('Setter-only decorator!');

    function replacementSetter(this: T, value: string): void {
      if (value.length < minValue) {
        return console.log(`Length can not be less than ${minValue.toString()}`)
      };
      return originalMethod.apply(this, [value]);
    }

    return replacementSetter;
  };
}

function MaxStringLength(maxValue: number) {
  return function <T>(originalMethod: (value: string) => void, context: ClassSetterDecoratorContext<T, string>) {
    if (context.kind !== 'setter') throw new Error('Setter-only decorator!');

    function replacementSetter(this: T, value: string): void {
      if (value.length > maxValue) {
        return console.log(`Length can not be more than ${maxValue.toString()}`)
      };
      return originalMethod.apply(this, [value]);
    }

    return replacementSetter;
  };
}

function Email<T>(originalMethod: (value: string) => void, context: ClassSetterDecoratorContext<T, string>) {
  if (context.kind !== 'setter') throw new Error('Setter-only decorator!');

  function replacementSetter(this: T, value: string): void {
    if (!value.includes('@') || value.includes('.ru')) {
      console.log('Invalid email entered.')
    };
    return originalMethod.apply(this, [value])
  }

  return replacementSetter
}

class Test {
  private _testString: string = '';

  @DeprecatedMethod({ reason: "It's life!" })
  test() {}

  @DeprecatedMethod({ reason: "It's life!", replaceMethod: '[some another method]' })
  test2() {}

  get testString(): string {
    return this._testString
  }
  @MinStringLength(22)
  @MaxStringLength(25)
  @Email
  set testString(value: string) {
    this._testString = value;
  }
}
const test = new Test();
test.test(); //@DeprecatedMethod with reason only
test.test2(); //@Deprecated Method with reason and replacement method
test.testString = 'Some too normale string'; // @Email
console.log(test.testString);
test.testString = 'Some too short string'; // @MinStringLength
console.log(test.testString);
test.testString = 'Some too loooooooooooong string'; // @MaxStringLength
console.log(test.testString);
