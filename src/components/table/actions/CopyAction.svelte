<script>
	import ActionBase from "./ActionBase.svelte";

    /**
	 * @type {any}
	 */
    export let item

    /**
	 * @param {Event} event
     * @param {any} item
	 */
    function handleCopy(event, item) {
        console.log(JSON.stringify(item))
    }
</script>

<ActionBase
    {item}
    title="Copy"
    doAction={handleCopy}
    {...$$restProps}
>
    <i class="bi bi-clipboard"></i>
</ActionBase>
