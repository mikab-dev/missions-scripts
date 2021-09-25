import { Wait } from "@module/missions/client/wait";
import { GangCar2Doors, GangCar4Doors } from "@shared/sdk/Config"
import { randomFamiliesSkin } from "@shared/sdk/Families/Utils";
import { NPC } from "@shared/sdk/Npc";
import { TextNotification } from "@shared/sdk/TextNotification";
import { Vector3, Vector3Heading } from "@shared/sdk/Vector";
import { ClientSeats, VEHICLE } from "@shared/sdk/Vehicle";
import { Config } from "./config";
// import { Config } from "./Config";



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

export const startMissionOneAcults = () => {

  const rightAcultsCarPosition = new Vector3Heading(-258.00, -2402.28, 6.00, 120)
  const rightCar = new VEHICLE("dloader", rightAcultsCarPosition, true, true)

  //add escort
  const middleAcultsCarPosition = new Vector3Heading(-254.78, -2398.37, 6.0, 10)
  const middleCar = new VEHICLE("rebel", middleAcultsCarPosition, true, true)

  const leftAcultsCarPosition = new Vector3Heading(-255.25, -2391.51, 6.0, 30)
  const leftCar = new VEHICLE("sandking", leftAcultsCarPosition, true, true)

  // const newPed = new NPC(1, "a_f_y_business_02", vehicleEscortPosition, false, true)
  // const newCar1 = global.CreateVehicle("sultan", -16.64, -683.81, 32.33, 120, true, true)
  // const newCar2 = global.CreateVehicle("sultan", -1.37, -681.72, 32.33, 120, true, true)

  rightCar.spawn().then((vehicle) => {
    vehicleRegistry.push(vehicle)
  })

  middleCar.spawn().then((vehicle) => {
    vehicleRegistry.push(vehicle)

  })

  leftCar.spawn().then((vehicle) => {
    vehicleRegistry.push(vehicle)
  })

  for (const ped of Config.peds) {
    const { model, position } = ped
    const { x, y, z, h } = position
    const pedPosition = new Vector3Heading(x, y, z, h)

    const npc = new NPC(1, model, pedPosition, true, true)
    pedRegistry.push(npc)
    npc.spawn().then(() => {
      // npc.attackPlayer()
      // npc.bluntMeleeWeapon()
      npc.addPistol()
      // npc.addGroupToPed(npc, 0x8296713E)
      npc.setGroupRelationship(0, 0x8296713E, 0x8296713E)
    })
  }



  // const checkIsNearMissionCar = setTick(async () => {
  //   await Wait(1000)
  //   const isNear = global.IsAnyPedNearPoint(376.22, -1680.68, 27.30, 1)

  //   if (isNear) {
  //     const blip = global.AddBlipForCoord(431.43, -1544.81, 28.84)
  //     global.SetBlipColour(blip, 27)
  //     global.SetBlipRoute(blip, true)
  //     global.SetBlipRouteColour(blip, 27)
  //     console.log("prés de la camionette")
  //     clearTick(checkIsNearMissionCar)
  //   }
  // })

  // const checkIsHalfPoint = setTick(async () => {
  //   await Wait(1000)

  //   const player = PlayerPedId()
  //   const playerCoords = GetEntityCoords(player, true)
  //   const [x, y, z] = playerCoords
  //   const missionHalfPoint = new Vector3(431.43, -1544.81, 28.84)

  //   if (Vdist(x, y, z, missionHalfPoint.x, missionHalfPoint.y, missionHalfPoint.z) < 50) {
  //     const carFam = new VEHICLE(modelFamilies, vehiclePosition, true, true)

  //     TextNotification("Ceci est un test")

  //     carFam.spawn().then((vehicle) => {
  //       vehicleRegistry.push(vehicle)
  //       vehicle.setPedInVehicle(ClientSeats.DRIVER, randomFamiliesSkin())
  //       vehicle.setPedInVehicle(ClientSeats.FRONT_RIGHT_PASSENGER, randomFamiliesSkin())
  //       vehicle.primaryColorFamilies()
  //       vehicle.secondaryColorFamilies()
  //     })
  //     clearTick(checkIsHalfPoint)
  //   } else {
  //     console.log("pas pres half point")
  //   }
  // })

}
