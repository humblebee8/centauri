<script>
    import { onDestroy } from "svelte";
    import { fly } from "svelte/transition";
	import { session } from "../supabase/clientStore";

    export let menuItems = [];
    let visible = false;
    const sessionObserver = session.subscribe(value => {
        if (value && 'authenticated' === value.role) {
            visible = true;
        }
    });

    onDestroy(() => {
        // unsubscribe
        sessionObserver();
    });
</script>
{#if visible}
    <div transition:fly={{duration: 900, delay: 600, y: 500}}>
        test
    </div>
{/if}