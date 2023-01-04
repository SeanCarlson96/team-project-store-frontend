import {SaleDTO} from "./SaleDTO";
import { CategoryDTO } from "./CategoryDTO";

export interface ProductDTO {
    id: number | null
    productName: string
    price: number
    saleId: number
    categories: CategoryDTO[]
    description: string
    discontinued: boolean
    image: string
    availableDate: Date
    quantity: number
    minAdPrice: number
}