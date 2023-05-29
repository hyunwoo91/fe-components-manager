<script>
	import ActionBase from "./ActionBase.svelte";

    /**
	 * @type {any}
	 */
    export let item

    /**
	 * @type {((arg0: any) => void)|undefined}
	 */
    export let openEditModal = undefined

    /**
	 * @param {Event} event
     * @param {any} item
	 */
    function handleEdit(event, item) {
        if (openEditModal) {
            openEditModal(item)
        }
    }
</script>

<ActionBase
    {item}
    title="Edit"
    doAction={handleEdit}
>
    <i class="bi bi-pencil-square"></i>
</ActionBase>
