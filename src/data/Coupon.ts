import { AppUser } from "./User"

export interface Coupon {
    id: number
    couponName: string
    startDate: Date
    stopDate: Date
    useLimit: number
    percentage: number
    user: AppUser
}