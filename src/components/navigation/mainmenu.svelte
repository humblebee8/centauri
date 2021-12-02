<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    export let menuItems = [];

    let currentPath = '', visible = false;
    onMount(() => {
        currentPath = window.location.pathname.replace('/', '');
        visible = true;
    });
</script>
{#if visible}
    <ul class="w-full flex text-2xl">
        {#each menuItems as item, index}
            <li 
                transition:fly={{duration: 300, y: -200, delay: index * 100}}
                class:active={currentPath === item.slug ? 'active' : ''}
                class="inline-block text-center flex-grow uppercase cursor-pointer 
                hover:text-centauri hover:bg-indigo-200
            ">
                <a 
                    class="block p-3" 
                    href="/{undefined === item.slug ? '' : item.slug}"
                    title="navigate to {item.label}"
                >
                    {undefined === item.label ? 'LABEL MISSING' : item.label}    
                </a>
            </li>
        {/each}
    </ul>
{/if}