import { Gender } from "@constants/auth.constants"
import { ModeratorStatus } from "@constants/moderator.constants"

export interface EmployeeFilterData {
    gender: Gender[]
    status: ModeratorStatus[]
}

export interface EmployeeFilterProps {
    onChange?: (data: EmployeeFilterData) => void
}