import { Vector3Heading } from "./vector"

export const enum SkinFamilies {
    SKIN01 = "g_m_y_famfor_01",
    SKIN02 = "g_m_y_famdnf_01",
    SKIN03 = "mp_m_famdd_01",

}

export class NPC {
    private _type: number
    private _model: string
    private _modelHash: number
    private _position: Vector3Heading
    private _isNetwork: boolean
    private _isScriptChecked: boolean

    private _npcEntity: number = null
    private _isInvincible = false
    private _isFrozen = false
    private _isBlockedEvents = false

    constructor(type: number, model: string, position: Vector3Heading, isNetwork: boolean, isScriptChecked: boolean) {
        this._type = type
        this._model = model
        this._position = position
        this._isNetwork = isNetwork
        this._isScriptChecked = isScriptChecked
        this._modelHash = NPC.getHashKey(model)

        //TODO vérifier invincible, blockvent etc si c'est pas valeur par défaut il faut appliquer
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


    //spawn des peds
    spawn(): Promise<NPC> {
        if (this._npcEntity === null) {
            return new Promise((resolve, reject) => {
                this.loadModel().then((status: boolean) => {
                    const { x, y, z, heading } = this._position
                    this._npcEntity = global.CreatePed(this._type, this._modelHash, x, y, z, heading, this._isNetwork, this._isScriptChecked)
                    resolve(this)
                }).catch((reason: string) => {
                    console.error(reason)
                    reject(reason)
                })
            })
        }
        return Promise.reject('Entity already exist')
    }

    //faire en sorte que les peds attaquent le joueur
    attackPlayer(): Promise<NPC> {
        if (this._npcEntity !== null) {
            return new Promise((resolve, reject) => {
                this.loadModel().then((status: boolean) => {
                    global.RequestModel(this._npcEntity)
                    global.TaskCombatPed(this._npcEntity, PlayerPedId(), 0, 16)

                }).catch((reason: string) => {
                    console.log(reason)
                    reject(reason)
                })
            })
        }
        return Promise.reject('Entity already exist')
    }

    // addGroup(groupName: string): void {
    //     if (this._npcEntity !== null) {
    //         global.AddRelationshipGroup(groupName, GetHashKey(groupName));
    //         global.SetRelationshipBetweenGroups(0, groupName, groupName)
    //     }
    // }

    bluntMeleeWeapon(): void {
        if (this._npcEntity !== null) {

            const availableWeapons = ["weapon_bat", "weapon_crowbar", "weapon_poolcue", "weapon_wrench", "weapon_golfclub", "weapon_knuckle"]
            const weaponModel = availableWeapons[Math.floor(Math.random() * availableWeapons.length)]
            const weaponModelHash = GetHashKey(weaponModel)

            global.GiveWeaponToPed(this._npcEntity, weaponModelHash, 35, true, true)
        }
    }

    isDead(): void {
        if (this._npcEntity !== null) {
            global.IsPedDeadOrDying(this._npcEntity, true)
            console.log("test", global.IsPedDeadOrDying(this._npcEntity, true))
        }
    }


    // global.GiveWeaponToPed(this._npcEntity, GetHashKey("weapon_pistol"), 35, false, true)
    despawn(): void {
        if (this._npcEntity !== null) {
            global.SetEntityAsMissionEntity(this._npcEntity, false, true)
        }
    }

    destroy(): void {
        if (this._npcEntity !== null) {
            global.SetEntityAsMissionEntity(this._npcEntity, false, true)
            global.DeleteEntity(this._npcEntity)
        }
    }

    setInvincible(state: boolean): this {
        this._isInvincible = state
        if (this._npcEntity !== null) {
            console.log("state", state)
            global.SetEntityInvincible(this._npcEntity, state)
        }
        return this
    }

    freeze(state: boolean): this {
        this._isFrozen = state

        if (this._npcEntity !== null) {
            global.FreezeEntityPosition(this._npcEntity, state)
        }

        return this
    }

    blockEvents(state: boolean): this {
        this._isBlockedEvents = state

        if (this._npcEntity !== null) {
            global.SetBlockingOfNonTemporaryEvents(this._npcEntity, state)
        }
        return this
    }


    setHeading(heading: number, transition = false): this {
        this._position.heading = heading

        //apply heading directly if ped is spawn
        if (this._npcEntity !== null) {
            global.SetEntityHeading(this._npcEntity, heading)
        }
        return this
    }
}
