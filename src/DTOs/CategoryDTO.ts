import { ProductDTO } from "./ProductDTO"

export interface CategoryDTO {
    id: number | null
    categoryName: string
    products: ProductDTO[]
}