<script>
    export let wine = undefined;
</script>

<div>
    <span class="WineName">{wine.name}</span>
    <span class="Label">Source:</span>
    <span>{wine.source}</span>
    <span class="Label">Type:</span>
    <span>{wine.type}</span>
</div>

<style>
    div {
        width: fit-content;
        padding: 10px;
    }
    span {
        display: block;
        font-size: larger;
    }

    .WineName {
        font-size: 25pt;
    }

    .Label {
        display: inline;
        color: #9f9f9f;
        font-size: small;
    }
</style>