import PairFinder from '../../modules/PairFinder.js'
import AtlasReader from '../../modules/AtlasReader.js'

test('Get sheets files', () => {
    PairFinder.GetFiles('./test/Spritesheet')
    .then(files => {
        expect(files).toContain('sheet_tanks.png');
        expect(files).toContain('sheet_tanks.xml');
    })
});

test('Find the pairs to iterate', () => {
    PairFinder.GetFiles('./test/Spritesheet')
    .then(files => {
        const pairs = PairFinder.FindPairs(files)

        expect(pairs.has('sheet_tanks.')).toBe(true);
    })
});

test('Read the xml content', async () => {
    const files = await PairFinder.GetFiles('./test/Spritesheet')

    for (let pair of PairFinder.FindPairs(files)) {
        const content = await AtlasReader.GetFileContent(`./test/Spritesheet/${pair}xml`)

        expect(content.length).not.toBe('')
    }
});

test('Parse content into objects', async () => {
    const files = await PairFinder.GetFiles('./test/Spritesheet')

    for (let pair of PairFinder.FindPairs(files)) {
        const content = await AtlasReader.GetFileContent(`./test/Spritesheet/${pair}xml`)
        const sprites = AtlasReader.ParseContent(content)
        const spritesArray = Array.from(sprites)

        expect(spritesArray[0]).toMatchObject({
            name: 'barrelBeige',
            x: '842',
            y: '108',
            width: '16',
            height: '50'
        })
    }
});