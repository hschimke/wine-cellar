<script>
    import WineDisplay from '$lib/WineDisplay.svelte';

    export let bottle;
</script>

<div>
    <span>{bottle.vintage}</span>
    <span>{bottle.bought}</span>
    <span>{bottle.purchased_from}</span>
    <span>{bottle.consumed}</span>
    <span>{bottle.storage_location}</span>
    {#if bottle.wine}
        <WineDisplay wine={bottle.wine} />
    {/if}
</div>

<style>

</style>