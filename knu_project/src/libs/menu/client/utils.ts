export const DrawText2 = (content: string, x: number, y: number, scale: number, font: number, color: any, intAlign: any, wrap: number) => {
    SetTextFont(font)
    SetTextScale(scale, scale)

    if (intAlign) {
        SetTextCentre(true)
    } else {
        SetTextJustification(intAlign || 1)
        if (intAlign == 2) {
            SetTextWrap(0.0, wrap || x)
        }
    }

    SetTextEntry("STRING")
    SetTextColour(color[0], color[1], color[2], color[3])
    AddTextComponentString(content)
    DrawText(x, y)
}

export const RenderSprite = (TextureDictionary: string, TextureName: string, X: number, Y: number, Width: number, Height: number, Heading: number, R: number, G: number, B: number, A: number) => {
    X: X || 0/1920
    Y: Y || 0/1080
    Width: Width || 0/1920
    Height: Height || 0/1080
    if (!HasStreamedTextureDictLoaded(TextureDictionary)) {
        RequestStreamedTextureDict(TextureDictionary, true)
    }
    DrawSprite(TextureDictionary, TextureName, X + Width * 0.5, Y + Height * 0.5, Width, Height, Heading || 0, R, G, B, A)
}