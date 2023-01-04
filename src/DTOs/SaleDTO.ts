import { ProductDTO } from "./ProductDTO"

export interface SaleDTO {
    id: number | null
    saleName: string
    startDate: Date
    stopDate: Date
    products: ProductDTO[]
    discountPercentage: number
}