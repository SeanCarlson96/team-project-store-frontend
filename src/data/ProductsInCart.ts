import { Product } from "./Product"

export interface ProductInCart {
    id: number
    quantity: number
    product: Product
}