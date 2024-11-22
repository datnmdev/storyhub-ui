import { OAuthStatus } from "@constants/oauth.constants"
import { Token } from "@features/auth/auth.type"

export interface OAuthState {
    status: OAuthStatus
    token: Token
}