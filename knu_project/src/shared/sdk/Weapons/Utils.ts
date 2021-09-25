import { assaultRiflesWeapons } from "./AssaultRifles"
import { bluntWeapons } from "./Blunts"
import { meleeWeapons } from "./Melees"
import { pistolWeapons } from "./Pistols"
import { shotgunsWeapons } from "./Shotguns"
import { smgWeapons } from "./Smgs"

// --- Random Blunt --- //
export const randomBluntWeapon = () => {
  return bluntWeapons[Math.floor(Math.random() * bluntWeapons.length)]
}

// -- Random Melee --- //
export const randomMeleeWeapon = () => {
  return meleeWeapons[Math.floor(Math.random() * meleeWeapons.length)]
}

// --- Random Pistol --- //
export const randomPistolWeapon = () => {
  return pistolWeapons[Math.floor(Math.random() * pistolWeapons.length)]
}

// --- Random Shotgun --- //
export const randomShotgunWeapon = () => {
  return shotgunsWeapons[Math.floor(Math.random() * shotgunsWeapons.length)]
}

// --- Random Smgs --- //
export const randomSmgWeapon = () => {
  return smgWeapons[Math.floor(Math.random() * smgWeapons.length)]
}

// --- Random Assaults --- //
export const randomAssaultRifleWeapon = () => {
  return assaultRiflesWeapons[Math.floor(Math.random() * assaultRiflesWeapons.length)]
}








