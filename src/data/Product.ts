import { Category } from "./Category"
import { Sale } from "./Sale"

export interface Product {
    id: number
    productName: string
    price: number
    sale: Sale | null
    categories: Category[]
    description: string
    discontinued: boolean
    image: string
    availableDate: Date | null
    quantity: number
    minAdPrice: number
}