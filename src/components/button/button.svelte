<script>
    import { writable } from "svelte/store";

    const count = writable(0);
</script>

<button on:click={() => {$count++}}>
    Click {$count}
</button>