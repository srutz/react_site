import { createContext } from "react"

export type WindowSize = {
    width: number,
    height: number
}

const size: WindowSize = {
    width: window.innerWidth,
    height: window.innerHeight
}

export const windowContext = createContext<WindowSize|null>(size)

alert("init context listener")
window.addEventListener('resize', () => {

})  