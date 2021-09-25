import { salvadorSkin } from "./SalvadorSkins"

//--Get random skin--//
export const randomSalvadorSkin = () => {
  return salvadorSkin[Math.floor(Math.random() * salvadorSkin.length)]
}
