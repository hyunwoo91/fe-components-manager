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
	 * @type {any}
	 */
    export let data = undefined

    /**
	 * @type {string|undefined}
	 */
    export let tooltip = undefined

    /**
	 * @type {((event:any, data:any)=>void)|undefined}
	 */
    export let onClick = undefined

    /**
	 * @type {((event:any, data:any)=>void)|undefined}
	 */
    export let onClickSecondary = undefined

    /**
	 * @param {any} event
	 */
    function handleClick(event) {
        if (onClick) {
            onClick(event, data)
        }
    }

    /**
	 * @param {any} event
	 */
    function handleClickSecondary(event) {
        if (onClickSecondary) {
            onClickSecondary(event, data)
        }
    }
</script>

<button
    class={className? className.join(" ") : ""}
    type="button"
    title={tooltip ? tooltip : ""}
    on:click={handleClick}
>
    {name}
    {#if $$slots.secondaryButton}
        <slot name="secondaryButton"/>
    {:else if onClickSecondary}
        <a
            href={null}
            on:click|stopPropagation={handleClickSecondary}
        ><i class="bi bi-x"></i></a>
    {/if}
</button>
