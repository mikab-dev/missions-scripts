import { randomBallasVehicle2Doors } from "@shared/sdk/Ballas/Utils";
import { randomFamiliesVehicle2Doors } from "@shared/sdk/Families/Utils";

export const Config = {
  vehicles: [
    {
      modelBallas: randomBallasVehicle2Doors(),
      position:
      {
        x: 376.22,
        y: -1680.68,
        z: 27.30,
        h: 220
      }
    },
    {
      modelFamilies: randomFamiliesVehicle2Doors(),
      position:
      {
        x: 433.00,
        y: -1482.24,
        z: 28.93,
        h: 180
      }
    },
    {
      modelFamilies: randomFamiliesVehicle2Doors(),
      position:
      {
        x: 485.83,
        y: -1549.13,
        z: 29.07,
        h: 50
      }
    },
  ]
}
