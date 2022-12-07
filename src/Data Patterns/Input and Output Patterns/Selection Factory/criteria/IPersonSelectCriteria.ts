/**
 * If attribute is UNDEFINED it wasn't changed (isChanged = false)
 */
export default interface IPersonSelectCriteria {
  id?: number
  firstName?: string
  lastName?: string
  year?: [number, number]
}
