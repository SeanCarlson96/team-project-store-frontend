import { Category } from "./Category"
import { Sale } from "./Sale"

export interface Product {
    id: number
    productName: string
    price: number
    sale: Sale
    categories: Category[]
    description: string
    discontinued: boolean
    image: string
    availableDate: Date
    quantity: number
    minAdPrice: number
}