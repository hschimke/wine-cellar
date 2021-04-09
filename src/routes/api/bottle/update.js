import { getModel } from '$lib/db.js';

export async function post(request) {
    const data = request.body;
    const { Bottle } = await getModel();

    let status = 'noaction'
    let id = -1;

    if (data.action === 'update') {
        const bottle = await Bottle.findByPk(data.id);
        bottle.vintage = data.vintage;
        bottle.bought = data.bought;
        bottle.purchased_from = data.purchased_from;
        bottle.consumed = data.consumed;
        bottle.storage_location = data.storage_location;
        bottle.WineId = data.wine_id;
        id = bottle.id;
        try {
            await bottle.save();
            status = 'updated';
        } catch (e) {
            status = 'error';
        }
    } else if (data.action === 'new') {
        try {
            const bottle = await Bottle.create({
                vintage: data.vintage,
                bought: data.bought,
                purchased_from: data.purchased_from,
                consumed: data.consumed,
                storage_location: data.storage_location,
                WineId: data.wine_id
            });
            status = 'saved';
            id = bottle.id;
        } catch (e) {
            status = 'error';
        }
    } else if (data.action === 'delete') {
        try{
            const bottle = await Bottle.findByPk(data.id);
            bottle.destroy();
            status = 'deleted';
        }catch(e){
            status = 'error';
        }
    }

    if (status !== 'noaction') {
        return {
            body: {
                status: status,
                id: id
            }
        };
    }
}