import { access, readFile } from 'fs/promises'
import { constants } from 'fs'

class AtlasReader {
    static async GetFileContent(xmlFile) {
        await access(xmlFile, constants.R_OK)

        return await readFile(xmlFile, 'utf8')
    }

    static ParseContent(content) {
        const list = new Set()
        const regex = /name="([\w\._]+)".*x="(\d+)".*y="(\d+)".*width="(\d+)".*height="(\d+)"/gm
        const matches = content.matchAll(regex)
        let next = matches.next()

        while (!next.done) {
            const match = next.value

            list.add({
                name: match[1].replace('.png', ''),
                x: match[2],
                y: match[3],
                width: match[4],
                height: match[5]
            })

            next = matches.next()
        }

        return list
    }
}

export default AtlasReader