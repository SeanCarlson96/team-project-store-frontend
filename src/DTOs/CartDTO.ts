import {ProductDTO} from "./ProductDTO";
import { ProductInCartDTO } from "./ProductInCartDTO";

export interface CartDTO {
    id: number | null
    purchaseDate: Date | null
    products: ProductInCartDTO[]
}