import { getModel } from '$lib/db.js';

export async function get({ params }) {
    const { Wine } = await getModel();
    const { wineid } = params;
    const wine = await Wine.findByPk(wineid);
    return {
        body: {
            wine
        }
    };
}