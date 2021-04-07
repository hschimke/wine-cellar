import { getModel } from '$lib/db.js';

export async function get({ params }) {
    const { Wine, Bottle } = await getModel();
    const { bottleid } = params;
    const bottle = await Bottle.findByPk(bottleid, { include: Wine });
    return {
        body: {
            bottle
        }
    };
}