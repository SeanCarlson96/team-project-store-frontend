import { Product } from "./Product"
import { ProductInCart } from "./ProductsInCart"

export interface Cart {
    id: number
    purchaseDate: Date
    products: ProductInCart[]
}