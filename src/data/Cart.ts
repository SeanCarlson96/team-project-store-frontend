import { Product } from "./Product"

export interface Cart {
    id: number
    purchaseDate: Date
    products: Product[]
}