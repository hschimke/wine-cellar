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
import WineForm from "$lib/WineForm.svelte";

    export let wine;
</script>

<div>
    <WineForm {wine} />
</div>

<style></style>