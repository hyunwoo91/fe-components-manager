<script>
    /**
	 * @type {any}
	 */
    export let item
    /**
     * @type {string|undefined}
     */
    export let title = undefined
    /**
	 * @type {(event:Event, item:any)=>void}
	 */
    export let doAction
</script>

{#if title}
<a
    href={null}
    on:click={(e)=>doAction(e, item)}
    data-toggle="tooltip" data-placement="bottom" title={title}
>
    <slot/>
</a>
{:else}
<a
    href={null}
    on:click={(e)=>doAction(e, item)}
>
    <slot name="action-icon"/>
</a>
{/if}

<style>
    a {
        color: black;
        cursor: pointer;
    }
</style>
