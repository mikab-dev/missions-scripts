import { Wait } from "@module/missions/client/wait";
import { GangCar2Doors, GangCar4Doors } from "@shared/sdk/Config"
import { Entity } from "@shared/sdk/Entity";
import { randomFamiliesSkin } from "@shared/sdk/Families/Utils";
import { Npc } from "@shared/sdk/Npc";
import { TextNotification } from "@shared/sdk/TextNotification";
import { Vector3, Vector3Heading } from "@shared/sdk/Vector";
import { ClientSeats, Vehicle } from "@shared/sdk/Vehicle";
import { randomShotgunWeapon, randomSmgWeapon } from "@shared/sdk/Weapons/Utils";
// import { Config } from "./Config";



const pedRegistry: Array<Npc> = []
const vehicleRegistry: Array<Vehicle> = []


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

export const startMissionOneBrinks = async () => {

  const vehicleBrinksPosition = new Vector3Heading(-5.75, -669.28, 32.33, 180)
  const vehicleEscortPosition = new Vector3Heading(2.9, -669.98, 32.33, 180)

  const brinksVan = new Vehicle("stockade", vehicleBrinksPosition, true, true)
  await brinksVan.spawn()

  const escortVehicle = new Vehicle("granger", vehicleEscortPosition, true, true)
  await escortVehicle.spawn()

  const escortDriver = new Npc(1, "s_m_m_armoured_01", vehicleEscortPosition, true, true)
  escortDriver.setArmor(100)
  escortDriver.attachWeapon(randomShotgunWeapon(), 30, true, true)
  await escortDriver.spawn()

  const escortPassenger = new Npc(1, "s_m_m_armoured_01", vehicleEscortPosition, true, true)
  escortPassenger.setArmor(100)
  escortPassenger.attachWeapon(randomSmgWeapon(), 30, true, true)
  await escortPassenger.spawn()





  const guardDriver = new Npc(1, "s_m_m_armoured_01", vehicleBrinksPosition, true, true)

  guardDriver.setArmor(100)
  guardDriver.attachWeapon(randomSmgWeapon(), 30, true, true)
  await guardDriver.spawn()

  const guardPassenger = new Npc(1, "s_m_m_armoured_02", vehicleBrinksPosition, true, true)

  guardPassenger.setArmor(100)
  guardPassenger.attachWeapon(randomShotgunWeapon(), 30, true, true)
  await guardPassenger.spawn()

  //set grp relationship
  global.SetPedRelationshipGroupHash(escortDriver.getEngineEntity(), 0xF50B51B7)
  global.SetPedRelationshipGroupHash(escortPassenger.getEngineEntity(), 0xF50B51B7)
  global.SetPedRelationshipGroupHash(guardDriver.getEngineEntity(), 0xF50B51B7)
  global.SetPedRelationshipGroupHash(guardPassenger.getEngineEntity(), 0xF50B51B7)
  global.SetRelationshipBetweenGroups(0, 0xF50B51B7, 0xF50B51B7)

  brinksVan.setPedIn(guardDriver, -1)
  brinksVan.setPedIn(guardPassenger, 0)

  escortVehicle.setPedIn(escortDriver, -1)
  escortVehicle.setPedIn(escortPassenger, 0)

  //1074528293 = drivingStyle rush to pos
  escortVehicle.escort(escortDriver, brinksVan, -1, 200, 786603, 5, 0, 150)
  brinksVan.driveToCoords(guardDriver, -2942.88, 477.86, 14.72, 80, 786603, 0)





























  // //add escort
  // const escortCar = new Vehicle("granger", vehicleEscortPosition, true, true)

  // // const newPed = new NPC(1, "a_f_y_business_02", vehicleEscortPosition, false, true)
  // // const newCar2 = global.CreateVehicle("sultan", -1.37, -681.72, 32.33, 120, true, true)
  // const newPed1 = global.CreatePed(1, "a_f_y_business_02", 0.52, -689.63, 32.33, 100, true, true)

  // const guardDriver = new Npc(1, "s_m_m_armoured_01",)


  // await car.spawn()
  // vehicleRegistry.push(car)
  // await car.setPedInBrinksVehicle("s_m_m_armoured_01")
  // await car.setPedInBrinksVehicle("s_m_m_armoured_02")


  // await escortCar.spawn()
  // vehicleRegistry.push(escortCar)
  // await escortCar.setPedInEscortVehicle("s_m_m_armoured_01")
  // await escortCar.setPedInEscortVehicle("s_m_m_armoured_02")
  // await escortCar.setPedInEscortVehicle("s_m_m_armoured_01")
  // await escortCar.setPedInEscortVehicle("s_m_m_armoured_01")

  // console.log(escortCar.getEngineEntity(), car.getEngineEntity())

  // global.TaskVehicleEscort(newPed1, escortCar.getEngineEntity(), car.getEngineEntity(), -1, 200, 2883621, 10, 1, 500)


  // await car.spawn().then((vehicle) => {
  //   vehicleRegistry.push(vehicle)
  //   vehicle.setPedInBrinksVehicle("s_m_m_armoured_01")
  //   vehicle.setPedInBrinksVehicle("s_m_m_armoured_02")
  //   console.log("vehicle", vehicle.getEngineEntity())
  // })

  // await escortCar.spawn().then((vehicle) => {
  //   vehicleRegistry.push(vehicle)
  //   // vehicle.setPedInEscortVehicle("s_m_m_armoured_01")
  //   vehicle.setPedInEscortVehicle("s_m_m_armoured_02")
  //   vehicle.setPedInEscortVehicle("s_m_m_armoured_01")
  //   vehicle.setPedInEscortVehicle("s_m_m_armoured_02")
  // })

  // // global.TaskVehicleEscort(newPed1, newCar1, newCar2, -1, 150, 1, 5, 1, 0)
  // global.TaskVehicleEscort(newPed1, escortCar.getEngineEntity(), car.getEngineEntity(), -1, 200, 2883621, 10, 1, 500)
  // // const newCar1 = global.CreateVehicle("buffalo", -1.37, -681.72, 32.33, 120, true, true)
  // // const newCar2 = global.CreateVehicle("sultan", -16.64, -683.81, 32.33, 120, true, true)



  // global.TaskVehicleEscort(newPed1, escortCar.getEngineEntity(), car.getEngineEntity(), -1, 200, 2883621, 150, 1, 500)




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
