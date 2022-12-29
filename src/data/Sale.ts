import { Product } from "./Product"

export interface Sale {
    id: number
    saleName: string
    startDate: Date
    stopDate: Date
    products: Product[]
    discountPercentage: number
}