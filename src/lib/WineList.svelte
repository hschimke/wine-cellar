<script>
    import { onMount } from "svelte";

    let wines;

    onMount(async () => {
        const response = await fetch(`/api/wines.json`);
        wines = (await response.json()).wines;
    });
</script>

<div>
    {#if wines}
        {#each wines as wine}
            <ul>
                <li>
                    <a href="/wine/{wine.id}">{wine.name}</a>
                </li>
            </ul>
        {/each}
    {:else}
        <p class="loading">loading...</p>
    {/if}
</div>

<css />
