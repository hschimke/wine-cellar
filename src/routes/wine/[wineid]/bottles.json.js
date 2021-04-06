import { getModel } from '$lib/db.js';

export async function get({ params }) {
    const { Bottle } = await getModel();
    const { wineid } = params;
    const bottles = await Bottle.findAll({
        where: {
            WineId: wineid
        }
    });
    return {
        body: {
            bottles
        }
    };
}