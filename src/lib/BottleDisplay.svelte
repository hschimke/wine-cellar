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
</div>

<style>

</style>