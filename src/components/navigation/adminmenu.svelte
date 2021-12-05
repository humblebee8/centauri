<script>
    import { onDestroy } from "svelte";
    import { fly, slide } from "svelte/transition";
    import Stars from "../effects/stars.svelte";
	import { session } from "../supabase/clientStore";
    import Fa from 'svelte-fa/src/fa.svelte';
    
    import {
        faPlusCircle,
        faCog
    } from '@fortawesome/free-solid-svg-icons';

    export let menuItems = []; // TODO: make admin menu customizable
    let visible = false, animate = false, createNew = false;
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
    {#if createNew}
        <div
            transition:slide={{duration: 900}}
            class="fixed top-0 left-0 w-full h-full z-50 bg-astro bg-opacity-90">
            <Stars amount=16 />
            <ul class="centered text-4xl w-full text-center uppercase cursor-pointer font-bold">
                <li class="py-3 my-2 transition-all duration-700 hover-shadow"
                    in:fly={{duration: 900, delay: 300, x: -200}}>
                    <a href="/create/page" title="create new page">
                        Page
                    </a>
                </li>
                <li class="py-3 my-2 transition-all duration-700 hover-shadow"
                    in:fly={{duration: 900, delay: 500, x: -200}}>
                    <a href="/create/post" title="create new post">
                        Post
                    </a>
                </li>
            </ul>
        </div>
    {/if}
    <div
        class="fixed bottom-6 z-50 flex w-full" 
        transition:fly={{duration: 900, delay: 600, y: 500}}>
        <div
            class="flex-1">
            <div
                class="inline-block"
                on:click={() => {createNew = !createNew;}}
            >
                <Fa 
                    class="text-7xl ml-6 cursor-pointer text-yellow-400 transition-all duration-700
                        hover:text-green-600"
                    icon={faPlusCircle} 
                />
            </div>
        </div>
        <div class="flex-1 text-yellow-400 hover:text-green-600 cursor-pointer">
            <div
                class="inline-block cogs"
                class:animate={animate}
                on:mouseenter={() => {animate = true;}}
                on:mouseleave={() => {animate = false;}}
                on:click={() => {console.log("CLICK")}}
            >
                <div class="absolute right-3 top-3">
                    <Fa 
                        class="ml-auto mr-9 mb-3 text-6xl transition-all duration-700
                            "
                        icon={faCog} 
                    />
                </div>
                <div class="absolute -right-4 -top-6">
                    <Fa 
                        class="ml-auto mr-9 mb-3 text-5xl transition-all duration-700
                            "
                        icon={faCog} 
                    />
                </div>
                <div class="absolute right-9 -top-5">
                    <Fa 
                        class="ml-auto mr-9 mb-3 text-3xl transition-all duration-700
                            "
                        icon={faCog} 
                    />
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
.hover-shadow:hover {
  box-shadow: 0px 3px 36px 1px rgba(3, 71, 216, 0.96);
}
</style>