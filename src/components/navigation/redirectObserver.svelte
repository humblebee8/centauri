<script>
    import { onMount } from "svelte";
    import { menuItems } from "./navigationStore";
    import { session } from "../supabase/clientStore";
    let currentPath = '';

    onMount(() => {
        currentPath = document.location.pathname;
        if ($menuItems) {
            const currentItem = $menuItems?.filter((item) => {
                return item.slug === currentPath.replaceAll('/', '');
            });
    
            // menu item exists
            if (undefined !== currentItem[0]) {
                // has authenticated prop
                if (undefined !== currentItem[0]?.authenticated && 
                   (undefined !== currentItem[0]?.authenticated && true === currentItem[0]?.authenticated && 'authenticated' !== $session?.role) ||
                   (undefined !== currentItem[0]?.authenticated && false === currentItem[0]?.authenticated && 'authenticated' === $session?.role)) {
                   
                    if ('/' !== currentPath) {
                       document.location = '/'; 
                    }
                }
            }
        }

        if ('authenticated' !== $session?.role && ('/create/page' === currentPath || '/create/post' === currentPath)) {
            if ('/signin' !== currentPath) {
                document.location = '/signin'; 
            }
        }
    });
</script>