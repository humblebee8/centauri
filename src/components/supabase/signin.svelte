<script>
    import { onMount } from "svelte";
    import { fly, blur } from "svelte/transition";
	import { supabase } from "$components/supabase/client";
    import Button3D from "$components/button/button3D.svelte";
    import Toast from "$components/vendor/toast.svelte";
    import { toast } from '@zerodevx/svelte-toast';

    let visible = false;
    onMount(() => {
        visible = true;
    });

    let email = '', password = '';
    const signIn = async() => {
        const { error } = await supabase.auth.signIn({email, password});
        if (null !== error) {
            toast.push("error: wrong username or password. Are you registered yet?");
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

    <div class="mt-4">
        <Button3D on:click={() => {signIn();}}>LOGIN</Button3D>
    </div>
{/if}