import {ProductDTO} from "./ProductDTO";
import { ProductInCart } from "./ProductInCartDTO";

export interface CartDTO {
    id: number | null
    purchaseDate: Date
    products: ProductInCart[]
}