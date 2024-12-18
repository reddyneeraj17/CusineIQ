export function validateTimeRange(startTime: Date, endTime: Date): boolean {
  return startTime < endTime
}

export function validateAmount(amount: number): boolean {
  return amount >= 0
}

export function validateQuantity(quantity: number, minQuantity: number): boolean {
  return quantity >= 0 && quantity >= minQuantity
}