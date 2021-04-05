<script>
    import { onMount } from "svelte";

    let wines;

    onMount(async () => {
        const response = await fetch(`/wines.json`);
        wines = (await response.json()).wines;
    });
</script>

<div>
    {#if wines}
        {#each wines as wine}
            <ul>
                <li>
                    {wine.name}
                </li>
            </ul>
        {/each}
    {:else}
        <p class="loading">loading...</p>
    {/if}
</div>

<css />
