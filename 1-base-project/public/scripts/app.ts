const testAdd = (number1: number, number2: number, showResult: boolean = false) => {
  const fnResult = number1 + number2
  showResult && console.warn(fnResult)
  return fnResult
}

const numbers = [10, 3]

testAdd(numbers[0], numbers[1], true)