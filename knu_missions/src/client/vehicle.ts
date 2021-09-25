import { resolve } from "path"
import { Vector3Heading } from "./vector"

export const enum ClientSeats {
    DRIVER = -1,
    FRONT_RIGHT_PASSENGER = 0,
    BACK_LEFT_PASSENGER = 1,
    BACK_RIGHT_PASSENGER = 2,
    FURTHER_BACK_LEFT_PASSENGER = 3,
    FURTHER_BACK_RIGHT_PASSENGER = 4
}


export class VEHICLE {
    private _model: string
    private _modelHash: number
    private _position: Vector3Heading
    private _isNetwork: boolean
    private _isScriptChecked: boolean

    private _vehicleEntity: number = null
    private _isInvincible = false
    private _isFrozen = false
    private _isBlockedEvents = false

    constructor(model: string, position: Vector3Heading, isNetwork: boolean, isScriptChecked: boolean) {
        this._model = model
        this._position = position
        this._isNetwork = isNetwork
        this._isScriptChecked = isScriptChecked
        this._modelHash = VEHICLE.getHashKey(model)

    }

    private loadModel(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (global.HasModelLoaded(this._modelHash)) {
                resolve(true)
            }

            if (!IsModelInCdimage(this._modelHash) && !IsModelValid(this._modelHash)) {
                reject("Model does not exist");
            }

            global.RequestModel(this._modelHash)

            const interval = setInterval(() => {

                if (global.HasModelLoaded(this._modelHash)) {
                    clearInterval(interval)
                    global.SetModelAsNoLongerNeeded(this._modelHash)

                    resolve(true)
                }
            }, 1000)
        });
    }

    static getHashKey(name: string): number {
        return global.GetHashKey(name)
    }



    spawn(): Promise<VEHICLE> {
        if (this._vehicleEntity === null) {
            return new Promise((resolve, reject) => {
                this.loadModel().then((status: boolean) => {
                    const { x, y, z, heading } = this._position
                    this._vehicleEntity = global.CreateVehicle(this._modelHash, x, y, z, heading, this._isNetwork, this._isScriptChecked)
                    resolve(this)
                }).catch((reason: string) => {
                    console.error(reason)
                    reject(reason)
                })
            })

        }

        return Promise.reject('Entity already exist')
    }

    setPedInVehicle(seat: ClientSeats, pedModel: string): Promise<VEHICLE> {
        if (this._vehicleEntity !== null) {
            return new Promise((resolve, reject) => {
                this.loadModel().then((status: boolean) => {
                    const createPed = global.CreatePedInsideVehicle(this._vehicleEntity, 1, GetHashKey(pedModel), seat, false, true)
                    global.RequestModel(pedModel)
                    global.TaskVehicleChase(createPed, global.PlayerPedId())
                    global.SetTaskVehicleChaseBehaviorFlag(createPed, 1, true)
                    global.TaskCombatPed(createPed, PlayerPedId(), 0, 16)
                    // global.SetPedCombatMovement(createPed, 3)
                    // global.SetPedCombatAttributes(createPed, 1, true)
                    // global.SetPedCombatAttributes(createPed, 20, true)
                    // global.SetPedCombatAttributes(createPed, 1424, true)
                    // global.GiveWeaponToPed(createPed, GetHashKey("weapon_bat"), 35, false, true)
                }).catch((reason: string) => {
                    console.log(reason)
                    reject(reason)
                })
            })

        }
        return Promise.reject('Entity already exist')
    }

    primaryColorFamilies(): void {
        if (this._vehicleEntity !== null) {
            global.SetVehicleCustomPrimaryColour(this._vehicleEntity, 0, 100, 0)
        }

    }
    secondaryColorFamilies(): void {
        if (this._vehicleEntity !== null) {
            global.SetVehicleCustomSecondaryColour(this._vehicleEntity, 0, 100, 0)
        }

    }
    primaryColorBallas(): void {
        if (this._vehicleEntity !== null) {
            global.SetVehicleCustomPrimaryColour(this._vehicleEntity, 75, 0, 130)
        }

    }
    secondaryColorBallas(): void {
        if (this._vehicleEntity !== null) {
            global.SetVehicleCustomSecondaryColour(this._vehicleEntity, 75, 0, 130)
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
        if (this._vehicleEntity !== null) {
            global.SetEntityAsMissionEntity(this._vehicleEntity, false, true)
        }
    }

    destroy(): void {
        if (this._vehicleEntity !== null) {

            //vérification de ped à l'intérieur pour les deletes
            const driver = global.GetPedInVehicleSeat(this._vehicleEntity, -1)
            global.DeleteEntity(driver)
            global.DeletePed(driver)

            //savoir combien de sièges sont occupés
            const totalSeat = global.GetVehicleNumberOfPassengers(this._vehicleEntity)
            console.log("total seat", totalSeat)






            //delete du véhicule
            global.SetEntityAsMissionEntity(this._vehicleEntity, false, true)
            global.DeleteEntity(this._vehicleEntity)
            this._vehicleEntity = null
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
