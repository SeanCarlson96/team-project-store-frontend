import {ProductDTO} from "./ProductDTO";

export interface CartDTO {
    id: number | null
    purchaseDate: Date
    products: ProductDTO[]
}