<script>
import {onMount} from 'svelte';

let locations;

onMount(async () => {
        const response = await fetch(`/api/locations.json`);
        locations = (await response.json()).locations;
    });
</script>

<div>
    {#if locations}
    {#each locations as location}
    <div class="LocationBox">
        <span class="Location">{location.location}</span>
        {#each location.bottles as bottle}
        <span class="Bottle"><a href={`/bottle/${bottle.id}`}>{bottle.vintage} - {bottle.Wine.name}</a></span>
        {/each}
    </div>
    {/each}
    {/if}
</div>

<style>
    .Location {
        display: block;
        font-size: 16pt;
    }
    .Bottle{
        display: block;
    }
    .LocationBox {
        display: block;
        width: 200px;
        float: left;
        border: 1px dotted #ccc;
        margin: 5px;
        padding: 5px;
    }
</style>