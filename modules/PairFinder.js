import { access, readdir } from 'fs/promises'
import { constants } from 'fs'

class PairFinder {
    static async GetFiles(directoryPath) {
        const fileExt = ['xml', 'png']
        let files = []

        await access(directoryPath, constants.R_OK)

        files = await readdir(directoryPath)

        return files.filter(file => fileExt.includes(file.substr(-3)))
    }

    static FindPairs(files) {
        const pairs = new Set()

        if (!files.length) {
            return []
        }

        for (let i = 0; i < files.length; ++i) {
            const file = files[i]
            const fileName = file.substr(0, file.length - 3)

            if (!pairs.has(fileName)) {
                const pair = files.filter(f => f.includes(fileName))

                if (pair.length == 2) {
                    pairs.add(fileName)
                }
            }
        }

        return pairs
    }
}

export default PairFinder