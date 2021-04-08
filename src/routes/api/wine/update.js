import { getModel } from '$lib/db.js';

export async function post(request) {
    const data = request.body;
    const { Wine } = await getModel();

    let status = 'noaction'
    let id = -1;

    if (data.action === 'update') {
        const wine = await Wine.findByPk(data.id);
        wine.name = data.name;
        wine.source = data.source;
        wine.type = data.type;
        id = wine.id;
        try {
            await wine.save();
            status = 'updated';
        } catch (e) {
            status = 'error';
        }
    } else if (data.action === 'new') {
        try {
            const wine = await Wine.create({
                name: data.name,
                source: data.source,
                type: data.type
            });
            status = 'saved';
            id = wine.id;
        } catch (e) {
            status = 'error';
        }
    } else if (data.action === 'delete') {
        try{
            const wine = await Wine.findByPk(data.id);
            wine.destroy();
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