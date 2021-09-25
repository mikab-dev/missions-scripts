import { Vector3Heading, Vector3 } from "./vector"
import { NPC } from "./npc"
import { VEHICLE, ClientSeats } from "./vehicle"
import { start } from "repl"
import { showTextMission } from "./showTextMission"

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

on('knu_kore:interact', () => {
  console.log("knu mission interact")
  if (checkHandleNeeded()) {
    openMissionsMenu()
  }
})

///----------- COMMANDES POUR LANCERS LES MISSIONS -----------------///////
//-------COMMANDE MISSION 1 BALLAS------------////
setImmediate(() => {
  global.RegisterCommand("/leveloneballas", (source, args) => {
    const [targetPlayerdId] = args
    if (targetPlayerdId === undefined) {
      console.warn("besoin de l'id joueur")
      return
    }
    global.emitNet("knu_missions:ballas_level_one", targetPlayerdId)
  }, false)
})

global.onNet("knu_missions:start_ballas_one", () => {
  startMissionOneBallas()
})


//-------COMMANDE MISSION 2 BALLAS------------////
setImmediate(() => {
  global.RegisterCommand("/leveltwoballas", (source, args) => {
    const [targetPlayerdId] = args
    if (targetPlayerdId === undefined) {
      console.warn("besoin de l'id joueur")
      return
    }
    global.emitNet("knu_missions:ballas_level_two", targetPlayerdId)
  }, false)
})

global.onNet("knu_missions:start_ballas_two", () => {
  startMissionTwoBallas()
})


const checkHandleNeeded = () => {
  const player = PlayerPedId()
  const playerCoords = GetEntityCoords(player, true)
  const [x, y, z] = playerCoords
  const ballasMissionDealerPosition = new Vector3Heading(392.40, -1678.70, 28.95, 140)
  if (Vdist(x, y, z, ballasMissionDealerPosition.x, ballasMissionDealerPosition.y, ballasMissionDealerPosition.z) < 2) {
    return true
  }
  // return true
}

const openMissionsMenu = () => {
  console.log("menu mission")
  SetNotificationTextEntry("STRING")
  AddTextComponentString("Salut tu veux travailler pour moi ptite frappe ?")
  DrawNotification(false, false)
}


///------------------------------ MISSION ONE BALLAS --------------------------------------------------------------///

//spawn ped ballas qui donne mission
setImmediate(() => {
  const ballasMissionDealerPosition = new Vector3Heading(392.40, -1678.70, 28.95, 140)
  const dealerPed = new NPC(1, "g_m_y_ballasout_01", ballasMissionDealerPosition, false, true)

  dealerPed.spawn().then((npc) => {
    pedRegistry.push(npc)
    npc.setInvincible(true)
    npc.freeze(true)
    npc.blockEvents(true)
  })
}, 0)

// const textDislay = (text: string) => {
//   SetNotificationTextEntry("STRING")
//   AddTextComponentString(text)
//   DrawNotification(false, false)
// }


const startMissionOneBallas = () => {

  //position ped families qui attaquent pour la mission 1 ballas
  const familiesOnePosition = new Vector3Heading(382.68, -1685.30, 37.78, 20)
  const familiesTwoPosition = new Vector3Heading(383.35, -1677.37, 37.78, 230)
  const familiesThreePosition = new Vector3Heading(380.54, -1681.67, 37.78, 250)
  const familiesFourPosition = new Vector3Heading(389.53, -1673.84, 27.31, 150)
  const familiesFivePosition = new Vector3Heading(387.00, -1673.23, 27.31, 150)

  //caractéristiques des peds families pour la mission 1 ballas
  const famOne = new NPC(1, "g_m_y_famfor_01", familiesOnePosition, true, true)
  const famTwo = new NPC(1, "g_m_y_famdnf_01", familiesTwoPosition, true, true)
  const famThree = new NPC(1, "mp_m_famdd_01", familiesThreePosition, true, true)
  const famFour = new NPC(1, "g_m_y_famdnf_01", familiesFourPosition, true, true)
  const famFive = new NPC(1, "g_m_y_famfor_01", familiesFivePosition, true, true)

  const groupName = "families"

  famOne.spawn().then((npc) => {

    pedRegistry.push(npc)
    npc.attackPlayer()
    npc.bluntMeleeWeapon()
    npc.isDead()
    // npc.addGroup(groupName)

  })

  famTwo.spawn().then((npc) => {
    pedRegistry.push(npc)
    npc.attackPlayer()
    npc.bluntMeleeWeapon()
    npc.isDead()
    // npc.addGroup(groupName)

  })

  famThree.spawn().then((npc) => {
    pedRegistry.push(npc)
    npc.attackPlayer()
    npc.bluntMeleeWeapon()
    npc.isDead()
    // npc.addGroup(groupName)

  })

  famFour.spawn().then((npc) => {
    pedRegistry.push(npc)
    npc.attackPlayer()
    npc.bluntMeleeWeapon()
    npc.isDead()
    // npc.addGroup(groupName)

  })

  famFive.spawn().then((npc) => {
    pedRegistry.push(npc)
    npc.attackPlayer()
    npc.bluntMeleeWeapon()
    npc.isDead()
    // npc.addGroup(groupName)
  })
}

///////----------------------------------------------FIN MISSION 1 BALLAS----------------------------------------------------------------//////////////
///------------------------------ MISSION ONE BALLAS --------------------------------------------------------------///

const startMissionTwoBallas = () => {
  const vehicleStartPosition = new Vector3Heading(376.22, -1680.68, 27.30, 220)
  const player = PlayerPedId()
  const isNearBurrito = global.IsAnyPedNearPoint(376.22, -1680.68, 27.30, 10)
  // const isNearEnd = global.IsAnyPedNearPoint(436.25, -1522.56, 29.24, 10)
  const vehiclePosition = new Vector3Heading(429.59, -1473.65, 29.0, 220)
  const vehiclePositionFirstFam = new Vector3Heading(433.00, -1482.24, 28.93, 180)
  const vehiclePositionSecondFam = new Vector3Heading(485.83, -1549.13, 29.07, 50)

  const vehicleStart = new VEHICLE("adder", vehicleStartPosition, true, true)

  const vehicleFirstFam = new VEHICLE("primo", vehiclePositionFirstFam, true, true)
  const vehicleSecondFam = new VEHICLE("primo", vehiclePositionSecondFam, true, true)



  if (isNearBurrito) {
    const blip = global.AddBlipForCoord(431.43, -1544.81, 28.84)

    vehicleStart.spawn().then((vehicle) => {
      vehicleRegistry.push(vehicle)
      vehicle.primaryColorBallas()
      vehicle.secondaryColorBallas()
    })

    global.SetBlipColour(blip, 27)
    global.SetBlipRoute(blip, true)
    global.SetBlipRouteColour(blip, 27)
    console.log("prés de la camionette")
  }

  const playerCoords = GetEntityCoords(player, true)
  const [x, y, z] = playerCoords
  const missionHalfPoint = new Vector3(431.43, -1544.81, 28.84)
  if (Vdist(x, y, z, missionHalfPoint.x, missionHalfPoint.y, missionHalfPoint.z) < 50) {

    // textDislay("Ceci est un test")
    showTextMission("Ceci est un test")
    console.log('half point ok')



    vehicleFirstFam.spawn().then((vehicle) => {
      vehicleRegistry.push(vehicle)
      vehicle.primaryColorFamilies()
      vehicle.secondaryColorFamilies()
      vehicle.setPedInVehicle(ClientSeats.DRIVER, "g_m_y_famfor_01")
      vehicle.setPedInVehicle(ClientSeats.FRONT_RIGHT_PASSENGER, "g_m_y_famdnf_01")
    })

    vehicleSecondFam.spawn().then((vehicle) => {
      vehicleRegistry.push(vehicle)
      vehicle.primaryColorFamilies()
      vehicle.secondaryColorFamilies()
      vehicle.setPedInVehicle(ClientSeats.DRIVER, "g_m_y_famfor_01")
      vehicle.setPedInVehicle(ClientSeats.FRONT_RIGHT_PASSENGER, "g_m_y_famdnf_01")
    })
  }

  // vehicle.spawn().then((vehicle) => {
  //   vehicleRegistry.push(vehicle)
  //   vehicle.primaryColorFamilies()
  //   vehicle.secondaryColorFamilies()
  //   vehicle.setPedInVehicle(ClientSeats.DRIVER, "g_m_y_famfor_01")
  //   vehicle.setPedInVehicle(ClientSeats.BACK_LEFT_PASSENGER, "g_m_y_famdnf_01")

  // })

  // vehicle2.spawn().then((vehicle) => {
  //   vehicleRegistry.push(vehicle)
  //   vehicle.primaryColorFamilies()
  //   vehicle.secondaryColorFamilies()
  //   vehicle.setPedInVehicle(ClientSeats.DRIVER, "g_m_y_famfor_01")
  //   vehicle.setPedInVehicle(ClientSeats.BACK_LEFT_PASSENGER, "g_f_y_families_01")
  // })
}
