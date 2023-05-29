<script>
    import { createEventDispatcher } from 'svelte';
    /**
	 * @type {import("../../../table/table").PropertyComponent}
	 */
    export let propertyComponent
    /**
	 * @type {any}
	 */
    export let property
    export let editable = false
    /**
	 * @type {Set<import("../../editableTable").EditMethod>|undefined}
	 */
    export let editMethod = undefined

    /**
	 * @type {any}
	 */
    export let itemId = undefined
    /**
	 * @type {number|undefined}
	 */
    export let itemIndex = undefined
    /**
	 * @type {number|undefined}
	 */
    export let propIndex = undefined
    /**
	 * @type {number|undefined}
	 */
    export let dataSize = undefined

    /**
	 * @param {any} event
	 */
    function handlePropertyClicked(event) {
        /**
         * @type {import("../../../table/table").ClickPropertyEventDetail}
         */
        const detail = {
            itemId,
            property,
            // @ts-ignore
            itemIndex,
            // @ts-ignore
            propIndex,
            // @ts-ignore
            dataSize,
        }
        dispatch("clickProperty", detail)
    }

	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="property-container"
    class:clickable="{editable}"
    on:click={editable && editMethod && editMethod.has('click-property')? handlePropertyClicked : undefined}
>
    <svelte:component
        this={propertyComponent.component}
        {property}
        {...propertyComponent.props}
        {...$$restProps}
    />
</div>

<style>
    div.clickable {
        cursor: pointer;
    }
</style>
