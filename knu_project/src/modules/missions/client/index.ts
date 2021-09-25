import { CoraUI } from "@libs/menu/client"
import { startMissionOneBallas } from "./missions/Ballas/Level1/Level1"
import { TextNotification } from "@shared/sdk/TextNotification"
import { Vector3Heading } from "@shared/sdk/Vector"
import { startMissionTwoBallas } from "./missions/Ballas/Level2/Level2"
import { startMissionThreeBallas } from "./missions/Ballas/Level3/Level3"
import { startMissionOneBrinks } from "./missions/Brinks/lvl1/Level1"
import { startMissionOneAcults } from "./missions/acults/Level1"
import { Npc } from "@shared/sdk/Npc"

const pedRegistry: Array<Npc> = []

on("onResourceStop", (resourceName) => {
  if (GetCurrentResourceName() != resourceName) {
    return;
  }
  //on vide les npcs
  for (const spawnedPed of pedRegistry) {
    spawnedPed.despawn()

  }
});

on('knu_kore:interact', () => {
  console.log("knu mission interact")
  if (checkHandleNeeded()) {
    openMissionsMenu()
  }
})

on('knu_kore:interact', () => {
  console.log("knu mission interact")
  if (checkHandleNeededBrinks()) {
    openMissionsMenuBrinks()
  }
})

///------------------------------ MISSION ONE TO THREE BALLAS --------------------------------------------------------------///

// spawn ped ballas qui donne mission
setImmediate(() => {
  const ballasMissionDealerPosition = new Vector3Heading(392.40, -1678.70, 28.95, 140)
  const brinksMissionDealerPosition = new Vector3Heading(-861.71, -577.57, 28.02, 250)
  const dealerPed = new Npc(1, "g_m_y_ballasout_01", ballasMissionDealerPosition, false, true)
  const dealerPedBrinks = new Npc(1, "a_f_y_business_02", brinksMissionDealerPosition, false, true)



  dealerPed.spawn().then((npc) => {
    pedRegistry.push(npc)
    npc.setInvincible(true)
    npc.freeze(true)
    npc.blockEvents(true)
  })

  dealerPedBrinks.spawn().then((npc) => {
    pedRegistry.push(npc)
    npc.setInvincible(true)
    npc.freeze(true)
    npc.blockEvents(true)
  })

}, 0)


const checkHandleNeeded = () => {
  const player = PlayerPedId()
  const playerCoords = GetEntityCoords(player, true)
  const [x, y, z] = playerCoords
  const ballasMissionDealerPosition = new Vector3Heading(392.40, -1678.70, 28.95, 140)
  const brinksMissionDealerPosition = new Vector3Heading(-861.71, -577.57, 29.02, 150)
  // ||
  //   Vdist(x, y, z, brinksMissionDealerPosition.x, brinksMissionDealerPosition.y, brinksMissionDealerPosition.z)
  if (Vdist(x, y, z, ballasMissionDealerPosition.x, ballasMissionDealerPosition.y, ballasMissionDealerPosition.z)
    < 2) {
    return true
  }
}
const checkHandleNeededBrinks = () => {
  const player = PlayerPedId()
  const playerCoords = GetEntityCoords(player, true)
  const [x, y, z] = playerCoords
  const brinksMissionDealerPosition = new Vector3Heading(-861.71, -577.57, 29.02, 150)

  if (Vdist(x, y, z, brinksMissionDealerPosition.x, brinksMissionDealerPosition.y, brinksMissionDealerPosition.z) < 10000) {
    return true
  }
}

const openMissionsMenu = () => {
  CoraUI.openMenu({
    name: 'Brandon',
    subtitle: "Tafs",
    glare: true,
    buttons: [
      {
        name: 'Défends moi !', onClick: () => {
          startMissionOneBallas(),
            TextNotification("Putain ces cons de families arrivent, défend moi !! On discutera après..."),
            CoraUI.closeMenu()
        }
      },
      {
        name: 'Vengeance', onClick: () => {
          startMissionTwoBallas()
          TextNotification("Prend ma caisse au rdc, et va niquer du families !"),
            CoraUI.closeMenu()
        }
      },
      {
        name: 'Espion', onClick: () => {
          startMissionThreeBallas()
          TextNotification("J'compte sur toi, soit discret !"),
            CoraUI.closeMenu()
        }
      },
      { name: 'Bye', onClick: () => CoraUI.closeMenu() },
    ],
  })
}

const openMissionsMenuBrinks = () => {
  CoraUI.openMenu({
    name: 'Brandon',
    subtitle: "Tafs",
    glare: true,
    buttons: [
      {
        name: 'Brinks 1', onClick: () => {
          startMissionOneBrinks(),
            TextNotification("Brinks level 1"),
            CoraUI.closeMenu()
        }
      },
      {
        name: 'Acult test', onClick: () => {
          startMissionOneAcults()
          TextNotification("Ces enculés ont un rdv va les fumer !!"),
            CoraUI.closeMenu()
        }
      },
      {
        name: 'Brinks 3', onClick: () => {
          startMissionThreeBallas()
          TextNotification("J'compte sur toi, soit discret !"),
            CoraUI.closeMenu()
        }
      },
      { name: 'Bye', onClick: () => CoraUI.closeMenu() },
    ],
  })
}

