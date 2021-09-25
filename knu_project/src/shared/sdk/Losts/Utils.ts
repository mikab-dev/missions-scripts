import { lostSkin } from "./LostsSkins"

//--Get random skin--//
export const randomLostSkin = () => {
  return lostSkin[Math.floor(Math.random() * lostSkin.length)]
}
