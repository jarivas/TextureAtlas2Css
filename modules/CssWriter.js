import { writeFile } from 'fs/promises';
import { Buffer } from 'buffer';

class CssWriter {
    static CssGenerator(sprites, imagefile) {
        let css = ''

        for (let s of sprites) {
            const style = `.${s.name}{width: ${s.width}px; height: ${s.height}px; background: url(${imagefile}png) -${s.x}px -${s.y}px;}`

            css = `${css}\n${style}`
        }

        return css
    }

    static async WriteFile(fileName, content) {
        return writeFile(fileName, new Uint8Array(Buffer.from(content)))
    }
}

export default CssWriter