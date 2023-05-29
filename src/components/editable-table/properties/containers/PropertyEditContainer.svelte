<!-- To suppoert '<svelte:component bind:this>' --> 
<svelte:options accessors={true}/>

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

    /**
	 * @type {any}
	 */
    export let itemId = undefined
    /**
	 * @type {number|undefined}
	 */
    export let itemIndex = undefined
    /**
	 * @type {number}
	 */
    export let propIndex
    /**
	 * @type {number|undefined}
	 */
    export let dataSize = undefined

    export const getValue = () => {
        return innerComponent.getValue()
    }

    /**
     * @type {(prop: any)=>import('../../editableTable').Validation}
     */
    export let validate = (prop) => {
        return {
            isValid : true
        }
    }
    /**
     * @type {((prop: any)=>any)|undefined}
     */
    export let process = undefined

    /**
	 * @type {any}
	 */
    let innerComponent

    /**
	 * @param {any} event
	 */
    function handleUpdateProperty(event) {
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

    /**
	 * @param {any} event
	 */
    function handleCancelUpdateProperty(event) {
        const detail = {
            itemId,
            // @ts-ignore
            itemIndex,
            // @ts-ignore
            propIndex,
            // @ts-ignore
            dataSize,
        }
        dispatch("cancelUpdate", detail)
    }

    const dispatch = createEventDispatcher();
</script>

<div
    class="property-container"
>
    <svelte:component
        bind:this={innerComponent}
        this={propertyComponent.component}
        {property}
        {propIndex}
        {validate}
        {process}
        {...propertyComponent.props}
        {...$$restProps}
        on:updateProperty={handleUpdateProperty}
        on:cancelUpdate={handleCancelUpdateProperty}
    />
</div>
