import { GangCar2Doors, GangCar4Doors } from "../Config"
import { ballasSkin } from "./BallasSkins"

//--Get random skin--//
export const randomBallasSkin = () => {
  return ballasSkin[Math.floor(Math.random() * ballasSkin.length)]
}

export const randomBallasVehicle4Doors = () => {
  return GangCar4Doors[Math.floor(Math.random() * GangCar4Doors.length)]
}
export const randomBallasVehicle2Doors = () => {
  return GangCar2Doors[Math.floor(Math.random() * GangCar2Doors.length)]
}
