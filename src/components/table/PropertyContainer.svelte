<script>
    import { createEventDispatcher, onMount } from 'svelte';
    /**
	 * @type {import("./table").PropertyComponent}
	 */
    export let propertyComponent
    /**
	 * @type {any}
	 */
    export let property
    export let editable = false
    /**
	 * @type {Set<import("./editableTable").EditMethod>|undefined}
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
         * @type {import("./table").ClickPropertyEventDetail}
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

    /**
	 * @param {any} event
	 */
    function handleUpdateProperty(event) {
        console.log('update event')
        const detail = {
            itemId,
            property: event.detail.property,
            // @ts-ignore
            itemIndex,
            // @ts-ignore
            propIndex,
            // @ts-ignore
            dataSize,
        }
        dispatch("updateProperty", detail)
    }

	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="property-container"
    class:clickable="{editable}"
    on:click={editable && editMethod && editMethod.has('click-property')? handlePropertyClicked : undefined}
>
    <svelte:component this={propertyComponent.component} {property} {...propertyComponent.props} on:updateProperty={handleUpdateProperty}/>
</div>

<style>
    div.clickable {
        cursor: pointer;
    }
</style>
