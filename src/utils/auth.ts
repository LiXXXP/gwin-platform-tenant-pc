import Cookies, { CookiesStatic } from 'js-cookie'

const cookie: CookiesStatic = Cookies.withAttributes({ domain: '.cdgwin.com' })

const TokenKey = 'gwin-token'
const RoleKey = 'gwin-roles'
const USER_ID_KEY = 'userId'
const ENTITY_ID_KEY = 'entityId'

export function getToken(): string | undefined {
  return cookie.get(TokenKey)
}

export function setToken(token: string): string | undefined {
  return cookie.set(TokenKey, token)
}

export function removeToken(): void {
  return cookie.remove(TokenKey)
}

export function getRoles(): string | undefined {
  return cookie.get(RoleKey)
}

export function setRoles(role: string): string | undefined {
  return cookie.set(RoleKey, role)
}

export function getUserId(): string | undefined {
  return cookie.get(USER_ID_KEY)
}

export function setEntityId(entityId: string): string | undefined {
  return cookie.set(ENTITY_ID_KEY, entityId)
}

export function getEntityId(): string | undefined {
  return cookie.get(ENTITY_ID_KEY)
}

export function removeEntityId(): void {
  return cookie.remove(ENTITY_ID_KEY)
}
