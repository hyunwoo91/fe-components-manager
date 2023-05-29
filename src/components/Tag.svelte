<script>
    /**
	 * @type {string[]|undefined}
	 */
     export let className = ["btn", "btn-primary", "rounded-pill"]

    /**
	 * @type {string}
	 */
     export let name

    /**
	 * @type {string|undefined}
	 */
     export let tooltip = undefined

    /**
	 * @type {((event:any)=>void)|undefined}
	 */
    export let onClick = undefined

    /**
	 * @type {((event:any)=>void)|undefined}
	 */
    export let onClickSecondary = undefined
</script>

<button
    class={className? className.join(" ") : ""}
    type="button"
    title={tooltip ? tooltip : ""}
    on:click={onClick}
>
    {name}
    {#if $$slots.secondaryButton}
        <slot name="secondaryButton"/>
    {:else if onClickSecondary}
        <a href={null} on:click|stopPropagation={onClickSecondary}><i class="bi bi-x"></i></a>
    {/if}
</button>
