import { vagosSkin } from "./VagosSkins"

//--Get random skin--//
export const randomVagosSkin = () => {
  return vagosSkin[Math.floor(Math.random() * vagosSkin.length)]
}
