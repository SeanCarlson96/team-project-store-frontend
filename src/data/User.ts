import { Cart } from "./Cart"
import { Coupon } from "./Coupon"

export interface AppUser {
    id: number
    email: string
    password: string
    userType: string

    carts: Cart[]

    coupons: Coupon[]
}