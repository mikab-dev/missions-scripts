import { acultSkin } from "./AcultsSkins"


//--Get random skin--//
export const randomAcultSkin = () => {
  return acultSkin[Math.floor(Math.random() * acultSkin.length)]
}
