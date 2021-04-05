import { getModel } from './src/lib/db.js';
import { wines, users } from './test-data/initial-data.js';

(async () => {
    const { Wine, Bottle, User, Note, Review } = await getModel();

    for (const user of users) {
        await User.create(user);
    }
    
    for (const wtd of wines) {
        // make wine
        const wine = await Wine.create({
            name: wtd.name,
            source: wtd.source,
            type: wtd.type,
        });
        // make bottles
        for (const bot of wtd.bottles) {
            wine.addBottle(await Bottle.create(bot));
        }
    }
})();

/*
const henry = await User.create({name:'Henry'});
console.log(henry);

const win = await Wine.create({
    name: 'new wine',
    source: 'store',
    type: 'red'
});

const bot = await Bottle.create({
    vintage: 2017,
    bought: new Date(),
    consumed: new Date(),
    storage_location: 'clla'
});

await bot.setWine(win);

await bot.save();

console.log(await win.getBottles());
*/