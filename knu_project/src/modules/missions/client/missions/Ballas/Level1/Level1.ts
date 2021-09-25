import { Config } from "./Config";
import { NPC } from "@shared/sdk/Npc"
import { TextNotification } from "@shared/sdk/TextNotification";
import { Vector3Heading } from "@shared/sdk/Vector"
import { Wait } from "../../../wait";

const pedRegistry: Array<NPC> = []

on("onResourceStop", (resourceName) => {
  if (GetCurrentResourceName() != resourceName) {
    return;
  }
  //on vide les npcs
  for (const spawnedPed of pedRegistry) {
    spawnedPed.despawn()
  }
});

export const startMissionOneBallas = () => {
  for (const ped of Config.peds) {
    const { model, position } = ped
    const { x, y, z, h } = position
    const pedPosition = new Vector3Heading(x, y, z, h)

    const npc = new NPC(1, model, pedPosition, true, true)
    pedRegistry.push(npc)
    npc.spawn().then(() => {
      npc.attackPlayer()
      npc.bluntMeleeWeapon()
    })
  }

  const checkPlayerDeath = setTick(async () => {
    await Wait(1000)
    const player = PlayerPedId()

    if (!global.IsEntityDead(player)) {
      const pedDeath = [];

      for (const ped of pedRegistry) {
        pedDeath.push(ped.isDead())
      }
      const almostOneAlive = pedDeath.includes(false)
      if (!almostOneAlive) {
        TextNotification("Ok on va pouvoir taffer ensemble en vif")
        clearTick(checkPlayerDeath)
      }
    }
    else {
      TextNotification("Reviens quand tu sera plus fort ptite frappe")
      clearTick(checkPlayerDeath)
    }
  })
}
