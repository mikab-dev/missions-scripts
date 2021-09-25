import { triadeSkin } from "./TriadeSkins"

//--Get random skin--//
export const randomTriadeSkin = () => {
  return triadeSkin[Math.floor(Math.random() * triadeSkin.length)]
}
