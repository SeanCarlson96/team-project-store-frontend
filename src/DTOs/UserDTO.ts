import {CartDTO} from "./CartDTO";
import {CouponDTO} from "./CouponDTO";

export interface AppUserDTO {
    id: number | null
    email: string
    password: string
    userType: string
    carts: CartDTO[]
    coupons: CouponDTO[]
}