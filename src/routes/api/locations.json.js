import { getModel, sq_fn, sq_col, Op } from '$lib/db.js';

export async function get() {
    const { Bottle, Wine } = await getModel();
    const locations = await Bottle.findAll({
        attributes: [
            [sq_fn('DISTINCT', sq_col('storage_location')), 'location']
        ],
        where: {
            [Op.and]: [
                {
                    storage_location: {
                        [Op.not]: null
                    }
                },
                {
                    storage_location: {
                        [Op.not]: ''
                    }
                }
            ]
        }
    });
    const lc = [];
    for( const local of locations){
        const bottles = await Bottle.findAll({
            where: {
                storage_location: JSON.parse(JSON.stringify(local)).location
            },
            include: [Wine]
        });
        lc.push({
            location: JSON.parse(JSON.stringify(local)).location,
            bottles: bottles,
        });
    }
    return {
        body: {
            locations: lc
        }
    };
}