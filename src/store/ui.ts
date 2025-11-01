import { atom } from 'jotai'

export const isSearchOpenAtom = atom<boolean>(false)

export const searchQueryAtom = atom<string>('')

export const isMobileMenuOpenAtom = atom<boolean>(false)
