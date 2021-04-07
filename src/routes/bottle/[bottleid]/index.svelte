<script context="module">
export async function load({ page, fetch, session, context }) {
        const url = `/api/bottle/${page.params.bottleid}/details.json`;
        const res = await fetch(url);
        if (res.ok) {
            return {
                props: {
                    bottle: (await res.json()).bottle,
                },
            };
        }

        return {
            status: res.status,
            error: new Error(`Could not load ${url}`),
        };
    }
</script>

<script>
import BottleDisplay from '$lib/BottleDisplay.svelte';

    export let bottle = undefined;
</script>

<div>
    <BottleDisplay {bottle} />
</div>

<style>

</style>