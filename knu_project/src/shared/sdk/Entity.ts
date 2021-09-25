export abstract class Entity {

  protected _entity: number = null
  protected _model: string
  protected _modelHash: number

  constructor(model: string) {
    this._model = model
    this._modelHash = Entity.getHashKey(model)
  }

  protected getEntity(): number {
    return this._entity
  }

  getEngineEntity(): number | null {
    return this._entity
  }

  protected setEntity(entity: number): void {
    this._entity = entity
  }

  protected getModel(): string {
    return this._model
  }

  protected setModel(model: string): void {
    this._model = model
  }

  protected loadModel(): Promise<boolean> {
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


  static loadModel(model: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const modelHash = Entity.getHashKey(model)
      if (global.HasModelLoaded(modelHash)) {
        resolve(true)
      }
      if (!IsModelInCdimage(modelHash) && !IsModelValid(modelHash)) {
        reject("Model does not exist");
      }
      global.RequestModel(modelHash)
      const interval = setInterval(() => {
        if (global.HasModelLoaded(modelHash)) {
          clearInterval(interval)
          global.SetModelAsNoLongerNeeded(modelHash)
          resolve(true)
        }
      }, 1000)
    });
  }


  despawn(): void {
    if (this._entity !== null) {
      global.SetEntityAsMissionEntity(this._entity, false, true)
    }
  }

  destroy(): void {
    if (this._entity !== null) {
      global.SetEntityAsMissionEntity(this._entity, false, true)
      global.DeleteEntity(this._entity)
    }
  }
}
