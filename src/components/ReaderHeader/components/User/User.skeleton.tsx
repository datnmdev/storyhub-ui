import { memo } from "react"
import { Skeleton } from "@mui/material";

function UserSkeleton() {
    return (
        <div className="border-[2px] border-solid rounded-[50%] border-[var(--gray)]">
            <Skeleton
                variant="circular"
                animation="wave"
                width={32}
                height={32}
            />
        </div>
    )
}

export default memo(UserSkeleton)