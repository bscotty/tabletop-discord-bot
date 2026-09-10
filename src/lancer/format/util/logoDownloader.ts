import sharp from "sharp";
import axios from "axios";
import * as fs from "node:fs";

export default async function downloadLogo(
    imageUrl: string,
    hexColor: string,
    outputFilePath: string
) {
    console.debug(`converting ${hexColor} to rgb`)
    const rgb = hexToRgb(hexColor)
    console.debug(`got rgb: ${rgb.r}, ${rgb.g}, ${rgb.b}`)
    const input = (await axios({url: imageUrl, responseType: "arraybuffer"})).data as Buffer;

    fs.openSync(outputFilePath, "w")

    await sharp(input)
        .resize(1080, 1080)
        .composite([{
            input: {
                create: {
                    width: 1080,
                    height: 1080,
                    channels: 4,
                    background: rgb
                }
            },
            blend: 'in'
        }])
        .tint(rgb)
        .png()
        .toFile(outputFilePath);

    const success = fs.existsSync(outputFilePath)
    console.log(`Wrote to ${outputFilePath}: ${success}`)
    return success
}

function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
