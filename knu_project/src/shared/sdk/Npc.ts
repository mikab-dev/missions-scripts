import { Vector3Heading } from "./Vector"
import { randomBluntWeapon, randomMeleeWeapon, randomPistolWeapon } from "./Weapons/Utils"
import { Entity } from "./Entity"


export class Npc extends Entity {

  private _type: number
  private _position: Vector3Heading
  private _isNetwork: boolean
  private _isScriptChecked: boolean
  private _armor: number
  private _equipedWeapon: { hash: number, ammos: number, isHidden: boolean, equipNow: boolean } = null

  private _isInvincible = false
  private _isFrozen = false
  private _isBlockedEvents = false

  constructor(type: number, model: string, position: Vector3Heading, isNetwork: boolean, isScriptChecked: boolean) {
    super(model)
    this._type = type
    this._position = position
    this._isNetwork = isNetwork
    this._isScriptChecked = isScriptChecked

    //TODO vérifier invincible, blockvent etc si c'est pas valeur par défaut il faut appliquer
  }


  //spawn des peds
  spawn(): Promise<Npc> {
    if (this._entity === null) {
      return new Promise((resolve, reject) => {
        this.loadModel().then((status: boolean) => {
          const { x, y, z, heading } = this._position
          this._entity = global.CreatePed(this._type, this._modelHash, x, y, z, heading, this._isNetwork, this._isScriptChecked)

          //define property for armor
          if (this._armor !== 0) {
            global.SetPedArmour(this._entity, this._armor)
          }

          //define property for weapon
          if (this._equipedWeapon !== null) {
            const { hash, ammos, isHidden, equipNow } = this._equipedWeapon
            global.GiveWeaponToPed(this._entity, hash, ammos, isHidden, equipNow)
          }
          resolve(this)
        }).catch((reason: string) => {
          console.error(reason)
          reject(reason)
        })
      })
    }
    return Promise.reject('Entity already exist')
  }

  move(): void {
    if (this._entity !== null) {
      global.TaskGoToCoordAnyMeans(this._entity, 215.73, -2240.15, 6.15, 1.0, 0, false, 786603, 0xbf800000)
    }
  }

  //faire en sorte que les peds attaquent le joueur
  attackPlayer(): Promise<Npc> {
    if (this._entity !== null) {
      return new Promise((resolve, reject) => {
        this.loadModel().then((status: boolean) => {
          global.RequestModel(this._entity)
          global.TaskCombatPed(this._entity, PlayerPedId(), 0, 16)

        }).catch((reason: string) => {
          console.log(reason)
          reject(reason)
        })
      })
    }
    return Promise.reject('Entity already exist')
  }

  attachWeapon(weaponModel: string, ammo = 0, isHidden = false, equipNow = false): void {
    const hashModelWeapon = Entity.getHashKey(weaponModel)
    this._equipedWeapon = { hash: hashModelWeapon, ammos: ammo, isHidden, equipNow }

    if (this._entity !== null) {
      global.GiveWeaponToPed(this._entity, hashModelWeapon, ammo, isHidden, equipNow)
    }
  }

  setArmor(amount = 0): void {
    this._armor = amount

    if (this._entity !== null) {
      global.SetPedArmour(this._entity, amount)
    }
  }

  // escort(driver: Npc, vehicleEscort: Vehicle, mode: number, speed: number, rivingStyle: number, minDistance: number, p7: number, noRoadDistance: number): void {
  //   global.TaskVehicleEscort(driver.getEngineEntity(), this._entity, vehicleEscort.getEngineEntity(), -1, 200, 1, 15, 0, 150)
  // }

  //TODO gérer au spawn
  setDefaultRelationshipGroup(hash: number): void {
    global.SetPedRelationshipGroupHash(this._entity, hash)
  }


  addGroupRelationship(groupHash: string | number): void {
    global.SetPedRelationshipGroupHash(this._entity, groupHash)
  }

  setGroupRelationship(type: number, firstGroupHash?: number, secondGroupHash?: number): void {
    if (this._entity !== null) {
      global.SetRelationshipBetweenGroups(type, firstGroupHash, secondGroupHash)
    }
  }


  //TODO refacto !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  bluntMeleeWeapon(): void {
    if (this._entity !== null) {

      const weaponModel = randomBluntWeapon()
      const weaponModelHash = GetHashKey(weaponModel)

      global.GiveWeaponToPed(this._entity, weaponModelHash, 35, true, true)
    }
  }

  allMeleeWeapon(): void {
    if (this._entity !== null) {

      const weaponModel = randomMeleeWeapon()
      const weaponModelHash = GetHashKey(weaponModel)

      global.GiveWeaponToPed(this._entity, weaponModelHash, 35, true, true)
    }
  }

  addPistol(): void {
    if (this._entity !== null) {

      const weaponModel = randomPistolWeapon()
      const weaponModelHash = GetHashKey(weaponModel)

      global.GiveWeaponToPed(this._entity, weaponModelHash, 35, true, true)
    }
  }

  isDead(): boolean {
    return this._entity !== null ? !!global.IsEntityDead(this._entity) : true
  }


  // global.GiveWeaponToPed(this._npcEntity, GetHashKey("weapon_pistol"), 35, false, true)


  setInvincible(state: boolean): this {
    this._isInvincible = state
    if (this._entity !== null) {
      console.log("state", state)
      global.SetEntityInvincible(this._entity, state)
    }
    return this
  }

  freeze(state: boolean): this {
    this._isFrozen = state

    if (this._entity !== null) {
      global.FreezeEntityPosition(this._entity, state)
    }

    return this
  }

  blockEvents(state: boolean): this {
    this._isBlockedEvents = state

    if (this._entity !== null) {
      global.SetBlockingOfNonTemporaryEvents(this._entity, state)
    }
    return this
  }


  setHeading(heading: number, transition = false): this {
    this._position.heading = heading

    //apply heading directly if ped is spawn
    if (this._entity !== null) {
      global.SetEntityHeading(this._entity, heading)
    }
    return this
  }
}
