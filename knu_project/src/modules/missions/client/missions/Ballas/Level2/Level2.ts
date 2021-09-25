import { Wait } from "@module/missions/client/wait";
import { GangCar2Doors, GangCar4Doors } from "@shared/sdk/Config"
import { randomFamiliesSkin } from "@shared/sdk/Families/Utils";
import { NPC } from "@shared/sdk/Npc";
import { TextNotification } from "@shared/sdk/TextNotification";
import { Vector3, Vector3Heading } from "@shared/sdk/Vector";
import { ClientSeats, VEHICLE } from "@shared/sdk/Vehicle";
import { Config } from "./Config";



const pedRegistry: Array<NPC> = []
const vehicleRegistry: Array<VEHICLE> = []


on("onResourceStop", (resourceName) => {
  if (GetCurrentResourceName() != resourceName) {
    return;
  }
  //on vide les npcs
  for (const spawnedPed of pedRegistry) {
    spawnedPed.despawn()

  }
  //on vide les voitures
  for (const spawnedVehicle of vehicleRegistry) {
    spawnedVehicle.destroy()
  }
});

export const startMissionTwoBallas = () => {
  for (const vehicle of Config.vehicles) {
    const { modelBallas, modelFamilies, position } = vehicle
    const { x, y, z, h } = position
    const vehiclePosition = new Vector3Heading(x, y, z, h)

    const car = new VEHICLE(modelBallas, vehiclePosition, true, true)
    vehicleRegistry.push(car)

    car.spawn().then((vehicle) => {
      vehicleRegistry.push(vehicle)
      vehicle.primaryColorBallas()
      vehicle.secondaryColorBallas()
    })

    const checkIsNearMissionCar = setTick(async () => {
      await Wait(1000)
      const isNear = global.IsAnyPedNearPoint(376.22, -1680.68, 27.30, 1)

      if (isNear) {
        const blip = global.AddBlipForCoord(431.43, -1544.81, 28.84)
        global.SetBlipColour(blip, 27)
        global.SetBlipRoute(blip, true)
        global.SetBlipRouteColour(blip, 27)
        console.log("prés de la camionette")
        clearTick(checkIsNearMissionCar)
      }
    })

    const checkIsHalfPoint = setTick(async () => {
      await Wait(1000)

      const player = PlayerPedId()
      const playerCoords = GetEntityCoords(player, true)
      const [x, y, z] = playerCoords
      const missionHalfPoint = new Vector3(431.43, -1544.81, 28.84)

      if (Vdist(x, y, z, missionHalfPoint.x, missionHalfPoint.y, missionHalfPoint.z) < 50) {
        const carFam = new VEHICLE(modelFamilies, vehiclePosition, true, true)

        TextNotification("Ceci est un test")

        carFam.spawn().then((vehicle) => {
          vehicleRegistry.push(vehicle)
          vehicle.setPedInVehicle(ClientSeats.DRIVER, randomFamiliesSkin())
          vehicle.setPedInVehicle(ClientSeats.FRONT_RIGHT_PASSENGER, randomFamiliesSkin())
          vehicle.primaryColorFamilies()
          vehicle.secondaryColorFamilies()
        })
        clearTick(checkIsHalfPoint)
      } else {
        console.log("pas pres half point")
      }
    })
  }
}
