import { AppUserDTO } from "./UserDTO"

export interface CouponDTO {
    id: number | null
    couponName: string
    startDate: Date
    stopDate: Date
    useLimit: number
    percentage: number
    userId: number
}