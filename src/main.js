import PairFinder from '../modules/PairFinder.js'
import AtlasReader from '../modules/AtlasReader.js'
import CssWriter from '../modules/CssWriter.js'

const myArgs = process.argv.slice(2)

const files = await PairFinder.GetFiles(myArgs[0])

for (let pair of PairFinder.FindPairs(files)) {
    AtlasReader.GetFileContent(`${myArgs[0]}/${pair}xml`).then(content => {
        const sprites = AtlasReader.ParseContent(content)

        CssWriter.WriteFile(`${myArgs[0]}/${pair}css`, CssWriter.CssGenerator(sprites, pair))
    })
}