<script>
    import { goto } from "$app/navigation";
    export let wine = undefined;

    let name;
    let source;
    let type;
    let action = "Save";
    let button_enabled = true;

    if (wine !== undefined) {
        name = wine.name;
        source = wine.source;
        type = wine.type;
        action = "Update";
    }

    async function handleSubmit() {
        button_enabled = false;
        const submission = {
            name: name,
            source: source,
            type: type,
            id: wine !== undefined ? wine.id : "",
            action: action === "Update" ? "update" : "new",
        };
        const result = await fetch(`/api/wine/update`, {
            method: "POST",
            body: JSON.stringify(submission),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (result.ok) {
            const json = await result.json();
            if (json.status === "updated") {
                goto(`/wine/${wine.id}`);
            } else if (json.status === "saved") {
                goto(`/wine/${json.id}/`);
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
            goto(`/wine/${wine.id}`);
        } else if (action === "Save") {
            goto(`/cellar`);
        }
    }

    async function handleDelete() {
        if (
            confirm(
                `Are you sure you want to delete ${wine.name}?\nAll bottles will be deleted as well.\nThis action cannot be undone.`
            )
        ) {
            button_enabled = false;
            const submission = {
                id: wine !== undefined ? wine.id : "",
                action: "delete",
            };
            const result = await fetch(`/api/wine/update`, {
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
        <span>Name:</span>
        <input bind:value={name} />
    </label>
    <label>
        <span>Source/Region:</span>
        <input bind:value={source} />
    </label>
    <label>
        <span>Type:</span>
        <input bind:value={type} />
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
    {#if wine}
        <button
            type="button"
            on:click|preventDefault={handleDelete}
            disabled={!button_enabled}
        >
            Delete
        </button>
    {/if}
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
