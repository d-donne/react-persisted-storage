import { User } from "../App"

export const storeItems = (key: string, value: User[] ) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.log(error)
  }
}


export const getItems = (key: string) => {
  try {
    const result = window.localStorage.getItem(key)
    return result ? JSON.parse(result) : []
  } catch (error) {
    console.log(error)
  }
}

export const removeAllItems = (key: string) => {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.log(error)
  }
}