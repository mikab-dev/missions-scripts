import { Entity } from "./Entity"
import { Npc } from "./Npc"
import { Vector3Heading } from "./Vector"

export const enum ClientSeats {
  DRIVER = -1,
  FRONT_RIGHT_PASSENGER = 0,
  BACK_LEFT_PASSENGER = 1,
  BACK_RIGHT_PASSENGER = 2,
  FURTHER_BACK_LEFT_PASSENGER = 3,
  FURTHER_BACK_RIGHT_PASSENGER = 4
}


export class Vehicle extends Entity {

  private _position: Vector3Heading
  private _isNetwork: boolean
  private _isScriptChecked: boolean

  private _isInvincible = false
  private _isFrozen = false
  private _isBlockedEvents = false

  constructor(model: string, position: Vector3Heading, isNetwork: boolean, isScriptChecked: boolean) {
    super(model)
    this._position = position
    this._isNetwork = isNetwork
    this._isScriptChecked = isScriptChecked
  }

  spawn(): Promise<Vehicle> {
    if (this._entity === null) {
      return new Promise((resolve, reject) => {
        return this.loadModel().then(() => {
          const { x, y, z, heading } = this._position
          const test = global.CreateVehicle(this._modelHash, x, y, z, heading, this._isNetwork, this._isScriptChecked)
          this._entity = test
          resolve(this)
        }).catch((reason: string) => {
          console.error(reason, this._modelHash, "spawn")
          reject(reason)
        })
      })

    }
    return Promise.reject('Entity already exist')
  }


  setPedInVehicle(seat: ClientSeats, pedModel: string): Promise<Vehicle> {
    if (this._entity !== null) {
      return new Promise((resolve, reject) => {
        this.loadModel().then(() => {
          const createPed = global.CreatePedInsideVehicle(this._entity, 1, GetHashKey(pedModel), seat, false, true)
          global.RequestModel(pedModel)
          global.TaskVehicleChase(createPed, global.PlayerPedId())
          global.SetTaskVehicleChaseBehaviorFlag(createPed, 1, true)
          global.TaskCombatPed(createPed, PlayerPedId(), 0, 16)
        }).catch((reason: string) => {
          console.log(reason, "setPedInVehicle")
          reject(reason)
        })
      })
    }
    return Promise.reject('Entity already exist')
  }

  setPedIn(ped: Npc, seat: ClientSeats) {
    global.SetPedIntoVehicle(ped.getEngineEntity(), this._entity, seat)
  }

  driveToCoords(driver: Npc, x: number, y: number, z: number, speed: number, driveMode: number, stopRage: number): void {
    global.TaskVehicleDriveToCoordLongrange(driver.getEngineEntity(), this._entity, x, y, z, speed, driveMode, stopRage)
  }

  escort(driver: Npc, vehicleEscort: Vehicle, mode: number, speed: number, drivingStyle: number, minDistance: number, p7: number, noRoadDistance: number): void {
    global.TaskVehicleEscort(driver.getEngineEntity(), this._entity, vehicleEscort.getEngineEntity(), mode, speed, drivingStyle, minDistance, p7, noRoadDistance)
  }

  // setPedInBrinksVehicle(pedModel: string): Promise<Vehicle> {
  //   if (this._entity !== null) {
  //     return new Promise((resolve, reject) => {
  //       this.loadModel().then(() => {
  //         const driverPedGuard = global.CreatePedInsideVehicle(this._entity, 1, pedModel, -1, false, true)
  //         const passangerPedGuard = global.CreatePedInsideVehicle(this._entity, 1, pedModel, 0, false, true)
  //         global.RequestModel(pedModel)

  //         //les deux gardes sont dans la même équipe
  //         global.SetPedRelationshipGroupHash(driverPedGuard, 0xF50B51B7)
  //         global.SetPedRelationshipGroupHash(passangerPedGuard, 0xF50B51B7)
  //         global.SetRelationshipBetweenGroups(0, 0xF50B51B7, 0xF50B51B7)

  //         global.GiveWeaponToPed(driverPedGuard, "WEAPON_ASSAULTSMG", 150, true, false)
  //         global.GiveWeaponToPed(passangerPedGuard, "WEAPON_PUMPSHOTGUN", 150, true, false)

  //         global.SetPedCombatMovement(driverPedGuard, 1)
  //         global.SetPedCombatMovement(passangerPedGuard, 1)

  //         global.SetPedArmour(driverPedGuard, 100)
  //         global.SetPedArmour(passangerPedGuard, 100)

  //         global.SetDriverAbility(driverPedGuard, 100)


  //         //drive to coords
  //         global.TaskVehicleDriveToCoordLongrange(driverPedGuard, this._entity, -654.63, -961.48, 20.83, 80, 1, 0)
  //       }).catch((reason: string) => {
  //         console.log(reason, "setPedInVehicle")
  //         reject(reason)
  //       })
  //     })
  //   }
  //   return Promise.reject('Entity already exist')
  // }

  // setPedInEscortVehicle(pedModel: string): Promise<Vehicle> {
  //   if (this._entity !== null) {
  //     return new Promise((resolve, reject) => {
  //       this.loadModel().then(() => {
  //         // const createPed = global.CreatePedInsideVehicle(this._vehicleEntity, 1, pedModel, -1, false, true)
  //         const guardPedBrinks1 = global.CreatePedInsideVehicle(this._entity, 1, pedModel, 0, false, true)
  //         const guardPedBrinks2 = global.CreatePedInsideVehicle(this._entity, 1, pedModel, 1, false, true)
  //         const guardPedBrinks3 = global.CreatePedInsideVehicle(this._entity, 1, pedModel, 2, false, true)
  //         global.RequestModel(pedModel)
  //         //les deux gardes sont dans la même équipe
  //         // global.SetPedRelationshipGroupHash(createPed, 0xF50B51B7)
  //         global.SetPedRelationshipGroupHash(guardPedBrinks1, 0xF50B51B7)
  //         global.SetPedRelationshipGroupHash(guardPedBrinks2, 0xF50B51B7)
  //         global.SetPedRelationshipGroupHash(guardPedBrinks3, 0xF50B51B7)
  //         global.SetRelationshipBetweenGroups(0, 0xF50B51B7, 0xF50B51B7)

  //         // global.GiveWeaponToPed(createPed, "WEAPON_ASSAULTSMG", 150, true, false)
  //         global.GiveWeaponToPed(guardPedBrinks1, "WEAPON_PUMPSHOTGUN", 150, true, false)
  //         global.GiveWeaponToPed(guardPedBrinks2, "WEAPON_SMG", 150, true, false)
  //         global.GiveWeaponToPed(guardPedBrinks3, "WEAPON_COMBATPISTOL", 150, true, false)

  //         // global.SetPedCombatMovement(createPed, 1)
  //         global.SetPedCombatMovement(guardPedBrinks1, 1)
  //         global.SetPedCombatMovement(guardPedBrinks2, 1)
  //         global.SetPedCombatMovement(guardPedBrinks3, 1)

  //         // global.SetPedArmour(createPed, 100)
  //         global.SetPedArmour(guardPedBrinks1, 100)
  //         global.SetPedArmour(guardPedBrinks2, 100)
  //         global.SetPedArmour(guardPedBrinks3, 100)

  //         // global.SetDriverAbility(createPed, 100)


  //         //drive to coords
  //         // global.TaskVehicleDriveToCoordLongrange(createPed, this._vehicleEntity, -654.63, -961.48, 20.83, 80, 1, 0)

  //       }).catch((reason: string) => {
  //         console.log(reason, "setPedInVehicle")
  //         reject(reason)
  //       })
  //     })
  //   }
  //   return Promise.reject('Entity already exist')
  // }

  allDoorsLocked(): Promise<Vehicle> {
    if (this._entity !== null) {
      return new Promise((resolve, reject) => {
        this.loadModel().then(() => {
          global.SetVehicleDoorsLocked(this._entity, 2)

        }).catch((reason: string) => {
          reject(reason)
        })
      })
    }
    return Promise.reject('Entity already exist')
  }

  //TODO add args RGB, refacto
  primaryColorFamilies(): void {
    if (this._entity !== null) {
      global.SetVehicleCustomPrimaryColour(this._entity, 0, 100, 0)
    }

  }

  secondaryColorFamilies(): void {
    if (this._entity !== null) {
      global.SetVehicleCustomSecondaryColour(this._entity, 0, 100, 0)
    }
  }

  primaryColorBallas(): void {
    if (this._entity !== null) {
      global.SetVehicleCustomPrimaryColour(this._entity, 75, 0, 130)
    }
  }

  secondaryColorBallas(): void {
    if (this._entity !== null) {
      global.SetVehicleCustomSecondaryColour(this._entity, 75, 0, 130)
    }
  }

  // primaryColorVagos(): void {
  //     if (this._vehicleEntity !== null) {
  //         global.SetVehicleCustomPrimaryColour(this._vehicleEntity, 255, 255, 0)
  //     }

  // }
  // secondaryColorVagos(): void {
  //     if (this._vehicleEntity !== null) {
  //         global.SetVehicleCustomSecondaryColour(this._vehicleEntity, 255, 255, 0)
  //     }

  // }

  despawn(): void {
    if (this._entity !== null) {
      global.SetEntityAsMissionEntity(this._entity, false, true)
    }
  }

  destroy(): void {
    if (this._entity !== null) {

      //vérification de ped à l'intérieur pour les deletes
      const driver = global.GetPedInVehicleSeat(this._entity, -1)
      global.DeleteEntity(driver)
      global.DeletePed(driver)

      //savoir combien de sièges sont occupés
      const totalSeat = global.GetVehicleNumberOfPassengers(this._entity)
      console.log("total seat", totalSeat)

      //delete du véhicule
      global.SetEntityAsMissionEntity(this._entity, false, true)
      global.DeleteEntity(this._entity)
      this._entity = null
    }
  }

  // chase(): void {
  //     if (this._vehicleEntity !== null ) {

  //     }
  // }


  // chase(driver, player): void {
  //     if (this._vehicleEntity !== null) {
  //         global.TaskVehicleChase(driver, player)
  //         console.log("-----", global.TaskVehicleChase(driver, player))
  //     }

  // }
  // setInvincible(state: boolean): this {
  //     this._isInvincible = state
  //     if (this._npcEntity !== null) {
  //         console.log("state", state)
  //         global.SetEntityInvincible(this._npcEntity, state)
  //     }

  //     return this
  // }

  //     freeze(state: boolean): this {
  //         this._isFrozen = state

  //         if (this._npcEntity !== null) {
  //             global.FreezeEntityPosition(this._npcEntity, state)
  //         }

  //         return this
  //     }

  //     blockEvents(state: boolean): this {
  //         this._isBlockedEvents = state

  //         if (this._npcEntity !== null) {
  //             global.SetBlockingOfNonTemporaryEvents(this._npcEntity, state)
  //         }

  //         return this
  //     }


  //     setHeading(heading: number, transition = false): this {
  //         this._position.heading = heading

  //         //apply heading directly if ped is spawn
  //         if (this._npcEntity !== null) {
  //             global.SetEntityHeading(this._npcEntity, heading)
  //         }

  //         return this
  //     }
}
