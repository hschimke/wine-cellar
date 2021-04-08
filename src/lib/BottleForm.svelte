<script>
    import { onMount } from "svelte";
    import {goto} from '$app/navigation';
    export let bottle = undefined;

    let vintage;
    let bought;
    let purchased_from;
    let consumed;
    let storage_location;
    let wine_id;
    let action = "Save";
    let button_enabled = true;
    let wines;

    if (bottle !== undefined) {
        vintage = bottle.vintage;
        bought = new Date(bottle.bought).toDateString();
        purchased_from = bottle.purchased_from;
        consumed = new Date(bottle.consumed).toDateString();
        storage_location = bottle.storage_location;
        wine_id = bottle.Wine.id;
        action = "Update";
    }

    onMount(async () => {
        const response = await fetch(`/api/wines.json`);
        wines = (await response.json()).wines;
    });

    function handleCancel() {
        if (action === "Update") {
            goto(`/bottle/${bottle.id}`);
        } else if (action === "Save") {
            goto(`/cellar`);
        }
    }
</script>

<form>
    <label>
        <span>Wine:</span>
        <select bind:value={wine_id}>
            {#if wines}
                {#each wines as wine}
                    <option value={wine.id}>{wine.name}</option>
                {/each}
            {/if}
        </select>
    </label>
    <label>
        <span>Vintage:</span>
        <input bind:value={vintage} />
    </label>
    <label>
        <span>Bought:</span>
        <input bind:value={bought} />
    </label>
    <label>
        <span>Purchased at:</span>
        <input bind:value={purchased_from} />
    </label>
    <label>
        <span>Consumed on:</span>
        <input bind:value={consumed} />
    </label>
    <label>
        <span>Storage Location:</span>
        <input bind:value={storage_location} />
    </label>
    <button type="submit" disabled={!button_enabled}>
        {action}
    </button>
    <button type="button" on:click|preventDefault={handleCancel} disabled={!button_enabled}>
        Cancel
    </button>
    <button type="button" disabled={!button_enabled}>
        Delete
    </button>
</form>

<style>
    label {
        display: block;
        height: 30px;
    }
    label span {
        display: block;
        float: left;
        width: 150px;
    }
    input {
        width: 300px;
    }
</style>
