import {getModel} from '$lib/db.js';

export async function get(){
    const {Wine} = await getModel();
    const wines = await Wine.findAll();
    return {
        body: {
            wines
        }
    };
}