// INTERFACES
export interface Validatable {
  value: string | number,
  required?: boolean // QUESTION MARK PERMITS NULL VALUES
  minLenght?: number
  maxLenght?: number
  min?: number
  max?: number
}

export function validate(validatableInput: Validatable): boolean {
  let isValid: boolean = true

  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toLocaleString().trim().length != 0
  }
  if (validatableInput.minLenght != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length > validatableInput.minLenght
  }
  if (validatableInput.maxLenght != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length < validatableInput.maxLenght
  }
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value > validatableInput.min
  }
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value < validatableInput.max
  }

  return isValid
}