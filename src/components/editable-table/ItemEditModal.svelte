<script>
	import {
        Modal,
        ModalHeader,
        ModalBody,
        ModalFooter,
        Button,
    } from "sveltestrap";

    /**
     * @type {any}
     */
    export let item
    /**
     * @type {import("./editableTable").Property[]}
     */
    export let properties

    /**
	 * @type {Map<import("./editableTable").PresentType, (props:any)=>import("./editableTable").PropertyPresentation>}
	 */
    export let propType2presentation

    /**
	 * @type {(arg0: any, arg1: any) => void}
	 */
     export let handleItemUpdate

    /**
     * @type {string|undefined}
     */
    export let title = undefined

    export let isOpen = false
    /**
	 * @type {(() => void) | undefined}
	 */
    export let toggle = () => isOpen = !isOpen

     /**
	 * @type {import("./editableTable").PropertyEditSvelteComponentTyped[]}
	 */
    let propertyComponents = []
     /**
	 * @param {any} event
	 */
    function handleUpdate(event) {
        if (!handleItemUpdate) {
            if (toggle) toggle()
            return
        }
        /**
         * @type {any}
         */
        let updatedItem = {}
        let isValid = true
        for (let i = 0; i < propertyComponents.length; i++) {
            let value = propertyComponents[i].getValue()
            if (propertyComponents[i].process) value = propertyComponents[i].process(value)
            updatedItem[properties[i].name] = value
            isValid = isValid && propertyComponents[i].validate(value).isValid
        }
        if (!isValid) {
            return
        }

        handleItemUpdate(item, updatedItem)
        if (toggle) toggle()
     }
</script>

<Modal
    bind:isOpen={isOpen}
    {toggle}
    fade={true}
    backdrop={true}
    centered={true}
    {...$$restProps}
>
    <ModalHeader {toggle}>{title ? title : "Edit an item"}</ModalHeader>
    <ModalBody>
        {#each properties as property, propIndex}
        {@const genPropertyPresentation = propType2presentation.get(property.presentType)}
        {#if genPropertyPresentation}
        {@const propertyPresentation = genPropertyPresentation({on:"modal"}).edit}
        <div>
            <h6>{property.title}</h6>
            <svelte:component
                bind:this={propertyComponents[propIndex]}
                this={propertyPresentation.component}
                property={item[property.name]}
                {...propertyPresentation.props}
            />
            {#if propIndex + 1 < properties.length}
            <hr>
            {/if}
        </div>
        {/if}
        {/each}
    </ModalBody>
    <ModalFooter>
        <Button color="primary" on:click={handleUpdate}>Save</Button>
        <Button color="secondary" on:click={toggle}>Cancel</Button>
    </ModalFooter>
 </Modal>
