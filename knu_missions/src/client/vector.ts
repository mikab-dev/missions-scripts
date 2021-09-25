export class Vector2 {
    private _x: number
    private _y: number

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    get x(): number {
        return this._x
    }

    get y(): number {
        return this._y
    }
}

export class Vector3 extends Vector2 {
    private _z: number

    constructor(x: number, y: number, z: number) {
        super(x, y)

        this._z = z
    }

    get z(): number {
        return this._z
    }
}

export class Vector3Heading extends Vector3 {
    private _h: number

    constructor(x: number, y: number, z: number, heading: number) {
        super(x, y, z)

        this._h = heading
    }

    get heading(): number {
        return this._h
    }

    set heading(heading: number) {
        this._h = heading
    }
}