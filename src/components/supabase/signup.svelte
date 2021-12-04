<script>
    import { onMount } from "svelte";
    import { fly, blur } from "svelte/transition";
	import { supabase } from "./client";
	import { signUpEvent, session } from "./clientStore";
    import Button3D from "../button/button3D.svelte";
    import Toast from "../vendor/toast.svelte";
    import { toast } from '@zerodevx/svelte-toast';

    let visible = false;
    onMount(() => {
        if ('authenticated' === $session?.role) {
            document.location = '/';
        } else {
            visible = true;
        }
    });

    let email = '', password = '';
    const signUp = async () => {
        // do sign up
        const {error} = await supabase.auth.signUp({email, password});
        if (null !== error) {
            toast.push(error.message);
        } else {
            signUpEvent.set(true);
        }
    }
</script>
<div class="font-bold uppercase">
    <Toast />
</div>
{#if visible}
    <label 
        in:fly={{duration: 900, x: -500}}
        for="username">Username</label>
    <input 
        bind:value={email}
        in:blur={{duration: 900, delay: 300}}
        type="text" name="username"
        required
    >

    <label 
        in:fly={{duration: 900, x: -500, delay: 100}}
        for="password">Password</label>
    <input 
        bind:value={password}
        in:blur={{duration: 900, delay: 300}}
        type="password" name="password"
        required
    >

    <div
        in:blur={{duration: 900, delay: 300}}
        class="mt-4"
    >
        <Button3D on:click={() => {signUp();}}>SIGN UP</Button3D>
    </div>
{/if}