import { GangCar2Doors, GangCar4Doors } from "../Config"
import { familiesSkin } from "./FamiliesSkins"

//--Get random skin--//
export const randomFamiliesSkin = () => {
  return familiesSkin[Math.floor(Math.random() * familiesSkin.length)]
}

export const randomFamiliesVehicle4Doors = () => {
  return GangCar4Doors[Math.floor(Math.random() * GangCar4Doors.length)]
}
export const randomFamiliesVehicle2Doors = () => {
  return GangCar2Doors[Math.floor(Math.random() * GangCar2Doors.length)]
}
