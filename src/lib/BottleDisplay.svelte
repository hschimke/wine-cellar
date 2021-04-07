<script>
    import WineDisplay from "$lib/WineDisplay.svelte";

    export let bottle;
</script>

<div>
    {#if bottle.Wine}
        <WineDisplay wine={bottle.Wine} />
    {/if}
    <span class="Label">Vintage</span>
    <span>{bottle.vintage !== null ? bottle.vintage : "unknown"}</span>
    <span class="Label">Bought</span>
    <span
        >{bottle.bought !== null
            ? new Date(bottle.bought).toDateString()
            : "unknown"}</span
    >
    <span class="Label">Source</span>
    <span
        >{bottle.purchased_from !== null
            ? bottle.purchased_from
            : "unknown"}</span
    >
    <span class="Label">Consumed</span>
    <span
        >{bottle.consumed !== null
            ? new Date(bottle.consumed).toDateString()
            : "unknown"}</span
    >
    <span class="Label">Stored</span>
    <span
        >{bottle.storage_location !== null
            ? bottle.storage_location
            : "unknown"}</span
    >
</div>

<style>
    span {
        display: block;
    }
    .Label {
        display: inline;
        color: #9f9f9f;
        font-size: small;
    }
</style>
