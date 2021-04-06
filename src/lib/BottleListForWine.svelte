<script>
    import { onMount } from "svelte";
    import BottleDisplay from '$lib/BottleDisplay.svelte';

    let bottles;

    onMount(async () => {
        const response = await fetch(`/wine/${wine.id}/bottles.json`);
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
                </li>
            </ul>
        {/each}
    {:else}
        <p class="loading">loading...</p>
    {/if}
</div>

<css />
