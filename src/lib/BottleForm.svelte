<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
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
        bought = bottle.bought !== null ? new Date(bottle.bought).toDateString() : ''
        purchased_from = bottle.purchased_from;
        consumed = bottle.consumed !== null ? new Date(bottle.consumed).toDateString() : '';
        storage_location = bottle.storage_location;
        wine_id = bottle.Wine.id;
        action = "Update";
    }

    onMount(async () => {
        const response = await fetch(`/api/wines.json`);
        wines = (await response.json()).wines;
    });

    async function handleSubmit() {
        button_enabled = false;
        const submission = {
            vintage: vintage,
            bought: bought,
            purchased_from: purchased_from,
            consumed: consumed,
            storage_location: storage_location,
            wine_id: wine_id,
            id: bottle !== undefined ? bottle.id : "",
            action: action === "Update" ? "update" : "new",
        };
        const result = await fetch(`/api/bottle/update`, {
            method: "POST",
            body: JSON.stringify(submission),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (result.ok) {
            const json = await result.json();
            if (json.status === "updated") {
                goto(`/bottle/${bottle.id}`);
            } else if (json.status === "saved") {
                goto(`/bottle/${json.id}/`);
            } else if (json.status === "deleted") {
                goto(`/cellar`);
            } else {
                alert("error");
            }
        }
        button_enabled = true;
    }

    function handleCancel() {
        if (action === "Update") {
            goto(`/bottle/${bottle.id}`);
        } else if (action === "Save") {
            goto(`/cellar`);
        }
    }

    async function handleDelete() {
        if (
            confirm(
                `Are you sure you want to delete this bottle?\nThis action cannot be undone.`
            )
        ) {
            button_enabled = false;
            const submission = {
                id: bottle !== undefined ? bottle.id : "",
                action: "delete",
            };
            const result = await fetch(`/api/bottle/update`, {
                method: "POST",
                body: JSON.stringify(submission),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (result.ok) {
                const json = await result.json();
                if (json.status === "deleted") {
                    goto(`/cellar`);
                } else {
                    alert("error");
                }
            }
            button_enabled = true;
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
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
    <button
        type="button"
        on:click|preventDefault={handleCancel}
        disabled={!button_enabled}
    >
        Cancel
    </button>
    <button
        type="button"
        on:click|preventDefault={handleDelete}
        disabled={!button_enabled}
    >
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
