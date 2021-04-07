<script>
    import { onMount } from "svelte";
    import BottleDisplay from '$lib/BottleDisplay.svelte';

    let bottles;

    onMount(async () => {
        const response = await fetch(`/api/wine/${wine.id}/bottles.json`);
        bottles = (await response.json()).bottles;
    });

    export let wine;
</script>

<div>
    {#if bottles}
        {#each bottles as bottle}
            <ul>
                <li>
                    <BottleDisplay {bottle} />
                    <a href={`/bottle/${bottle.id}/`}>[link]</a>
                </li>
            </ul>
        {/each}
    {:else}
        <p class="loading">loading...</p>
    {/if}
</div>

<style>
    ul {
        list-style: none;
    }
</style>
