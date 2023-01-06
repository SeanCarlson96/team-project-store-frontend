import { Product } from "./Product"

export interface ProductInCart {
    id: number | null
    quantity: number
    product: Product
}