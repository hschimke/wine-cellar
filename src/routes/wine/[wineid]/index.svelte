<script context="module">
    export async function load({ page, fetch, session, context }) {
        const url = `/api/wine/${page.params.wineid}/details.json`;
        const res = await fetch(url);
        if (res.ok) {
            return {
                props: {
                    wine: (await res.json()).wine,
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
    import BottleListForWine from "$lib/BottleListForWine.svelte";
    import WineDisplay from "$lib/WineDisplay.svelte";

    export let wine = undefined;
</script>

<div>
    <WineDisplay {wine} />
    <BottleListForWine {wine} />
</div>
