export interface TableColum<T> {
  name:string
  label: string
  align: string
  field: (row: T | string) => string|number
}
