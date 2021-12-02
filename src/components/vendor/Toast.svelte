<script>
    import { SvelteToast } from '@zerodevx/svelte-toast'
    
    const options = {
        pausable: true,
        theme: {
            '--toastBackground': '#C4B5FD',
            '--toastBarBackground': '#9D174D',
            '--toastMsgPadding': '24px',
            '--toastWidth': '20rem',
            '--toastColor': '#000014'
        }
    };
</script>
<SvelteToast {options} />