import { Config } from "./Config";
import { NPC } from "@shared/sdk/Npc"
import { TextNotification } from "@shared/sdk/TextNotification";
import { Vector3, Vector3Heading } from "@shared/sdk/Vector"
import { Wait } from "../../../wait";
import { VEHICLE } from "@shared/sdk/Vehicle";

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
});

export const startMissionThreeBallas = () => {
  const blip = global.AddBlipForCoord(221.64, -2240.73, 5.64)
  global.SetBlipColour(blip, 27)
  global.SetBlipRoute(blip, true)
  global.SetBlipRouteColour(blip, 27)
  const player = global.PlayerPedId()
  //pos où rendre voiture = 355.42, -1721.46, 28.66

  const carpos = new Vector3Heading(193.34, -2239.81, 5.76, 50)
  const car = new VEHICLE("sultan", carpos, true, true)
  // const getCar = global.GetVehiclePedIsIn(player, false)
  // const isPlayerInFamiliesVehicule = global.IsPedInVehicle(player, getCar, false)

  car.spawn().then((vehicle) => {
    vehicleRegistry.push(vehicle)
    // vehicle.allDoorsLocked()
    vehicle.primaryColorFamilies()
    vehicle.secondaryColorFamilies()
  })

  const popPedIfPlayerNear = setTick(async () => {
    await Wait(1000)
    // const isNear = global.IsAnyPedNearPoint(234.87, -2103.46, 16.95, 100)
    const isCenter = global.IsAnyPedNearPoint(221.64, -2240.73, 5.64, 10)


    // const blip = global.AddBlipForCoord(221.64, -2240.73, 5.64)
    // global.SetBlipColour(blip, 38)
    // global.SetBlipRoute(blip, true)
    // global.SetBlipRouteColour(blip, 38)
    // const leaveCar = new Vector3(221.64, -2240.73, 5.64)

    // if (leaveCar) {
    //   console.log("zone de rendu")
    // }

    if (isCenter) {
      console.log("prés du point d'entrée")
      for (const ped of Config.peds) {
        const { model, position } = ped
        const { x, y, z, h } = position
        const pedPosition = new Vector3Heading(x, y, z, h)
        const npc = new NPC(1, model, pedPosition, true, true)
        pedRegistry.push(npc)
        npc.spawn().then(() => {
          npc.attackPlayer()
          npc.move()
          npc.allMeleeWeapon()
        })
        clearTick(popPedIfPlayerNear)
      }
    } else {
      console.log("pas près")
    }


  })


  // const checkPlayerDeath = setTick(async () => {
  //   await Wait(1000)
  //   const player = PlayerPedId()

  //   if (!global.IsEntityDead(player)) {
  //     const pedDeath = [];
  //     for (const ped of pedRegistry) {
  //       pedDeath.push(ped.isDead())
  //     }
  //     const almostOneAlive = pedDeath.includes(false)
  //     if (!almostOneAlive) {
  //       TextNotification("Ok on va pouvoir taffer ensemble en vif")
  //       clearTick(checkPlayerDeath)
  //     }
  //   }
  //   else {
  //     TextNotification("Reviens quand tu sera plus fort ptite frappe")
  //     clearTick(checkPlayerDeath)
  //   }
  // })
}
