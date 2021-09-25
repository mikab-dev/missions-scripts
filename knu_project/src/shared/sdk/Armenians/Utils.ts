import { armenianSkin } from "./ArmeniansSkins"


//--Get random skin--//
export const randomArmenianSkin = () => {
  return armenianSkin[Math.floor(Math.random() * armenianSkin.length)]
}
