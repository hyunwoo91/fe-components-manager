<script>
    /**
	 * @type {any}
	 */
    export let property

    /**
	 * @type {string[]}
	 */
     export let className = []
</script>

<div class={className.join(" ")} {...$$restProps}>{property}</div>
