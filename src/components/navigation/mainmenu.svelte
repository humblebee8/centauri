<script>
    import { onMount, onDestroy } from "svelte";
    import { fly } from "svelte/transition";
	import { lastMenuClicked } from "$components/navigation/navigationStore";
	import { session, logoutEvent } from "$components/supabase/clientStore";

    export let menuItems = [];
    let currentPath = '', visible = false;

    const observeLogout = lastMenuClicked.subscribe(value => {
        if (value) {
            if ('logout' === value) {
                logoutEvent.set(true);
            }
        }
    });

    onMount(() => {
        currentPath = window.location.pathname.replace('/', '');
        visible = true;
    });

    onDestroy(() => {
        // unsubscribe
        observeLogout();
    });
</script>
{#if visible}
    <ul class="w-full flex text-2xl">
        {#each menuItems as item, index}
            {#if !item.authenticated || 'authenticated' === $session?.role}
                <li 
                    on:click={() => {lastMenuClicked.set(item.slug)}}
                    transition:fly={{duration: 300, y: -200, delay: index * 100}}
                    class:active={currentPath === item.slug ? 'active' : ''}
                    class="inline-block text-center flex-grow uppercase cursor-pointer 
                    hover:text-centauri hover:bg-indigo-200
                ">
                    {#if item.preventDefault && item.preventDefault === true}
                        <a 
                            class="block p-3" 
                            href="#{undefined === item.slug ? '' : item.slug}"
                            title="navigate to {item.label}"
                        >
                            {undefined === item.label ? 'LABEL MISSING' : item.label}    
                        </a>
                    {:else}
                        <a 
                            class="block p-3" 
                            href="/{undefined === item.slug ? '' : item.slug}"
                            title="navigate to {item.label}"
                        >
                            {undefined === item.label ? 'LABEL MISSING' : item.label}    
                        </a>
                    {/if}
                </li>
            {/if}
        {/each}
    </ul>
{/if}