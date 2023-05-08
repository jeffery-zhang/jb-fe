import { IRuleItem, IValidatorResult } from '../interfaces/form.interface'

export const validate = (
  val: string | number | (string | number)[],
  rules: IRuleItem[],
): Promise<IValidatorResult> =>
  new Promise((resolve) => {
    for (let rule of rules) {
      const result = validatorOneRule(val, rule)
      if (!result.valid) {
        resolve(result)
        break
      }
    }

    resolve({
      valid: true,
      message: '',
    })
  })

const validatorOneRule = (
  val: string | number | (string | number)[],
  rule: IRuleItem,
): IValidatorResult => {
  const { type, message } = rule

  if (typeof val === 'string' || type === 'string') {
    return {
      valid: validateString(val as string, rule),
      message: message || '',
    }
  }

  if (typeof val === 'number' || type === 'number') {
    return {
      valid: validateNumber(val as number, rule),
      message: message || '',
    }
  }

  if (Array.isArray(val)) {
    return {
      valid: validateArray(val, rule),
      message: message || '',
    }
  }

  return {
    valid: false,
    message: '',
  }
}

const validateString = (val: string, rule: IRuleItem): boolean => {
  const { pattern, max, min, required } = rule

  if (typeof val !== 'string') return false
  if (required && !val) return false
  if (pattern && !pattern.test(val)) return false
  if ((max && val.length > max) || (min && val.length < min)) return false

  return true
}

const validateNumber = (val: number, rule: IRuleItem): boolean => {
  const { max, min, required } = rule

  if (typeof val !== 'number') return false
  if (required && !val && val !== 0) return false
  if ((max && Number(val) > max) || (min && Number(val) < min)) return false

  return true
}

const validateArray = (val: (string | number)[], rule: IRuleItem): boolean => {
  const { max, min, required } = rule

  if (!Array.isArray(val)) return false
  if (required && val.length === 0) return false
  if ((max && val.length > max) || (min && val.length < min)) return false

  return true
}
