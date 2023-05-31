<script>
    import { nanoid } from 'nanoid'
    /**
     * @type {any[]}
     */
    export let values

    /**
     * @type {import('./listEditor').EditableListItemComponentTyped}
     */
    export let editComponent
    /**
     * @type {import('./listEditor').ListItemComponentTyped}
     */
    export let viewComponent

    /**
     * @type {import("./listEditor").Mode}
     */
    export let mode = "editor"
    /**
     * @type {import("./listEditor").ActionShowingStyle}
     */
    export let actionShowingStyle = "hover"

    /**
     * @type {number?}
     */
    let editingItemIndex = null

    /**
	 * @type {number?}
	 */
    let focusedItemIndex = null

    /**
	 * @param {number} index
	 */
    function handleRemoveItem(index) {
        editingItemIndex = null
        values.splice(index, 1)
        values = values
    }

    /**
	 * @param {number} index
     * @returns {import('./listEditor').Updated}
	 */
    function handleUpdated(index) {
        return (value)=>{
            if (editingItemIndex == index) {
                values[index] = value
                editingItemIndex = null
                values = values
            }
        }
    }

    /**
	 * @param {number} index
     * @returns {import('./listEditor').Canceled}
	 */
    function handleCanceled(index) {
        return ()=>{
            if (editingItemIndex == index) {
                editingItemIndex = null
            }
        }
    }

    /**
	 * @param {HTMLLIElement} itemEl
	 * @param {number} index
	 */
    function onItemMount(itemEl, index) {
        itemEl.addEventListener("mouseenter", (e)=>{
            focusedItemIndex = index
        })
        itemEl.addEventListener("mouseleave", (e)=>{
            if (focusedItemIndex===index) {
                focusedItemIndex = null
            }
        })
    }
</script>

<ul class="list-group">
    {#each values as value, index (nanoid(12))}
    <li class="list-group-item" use:onItemMount={index}>
        {#if mode == "viewer"}
        <svelte:component
            this={viewComponent}
            {value}
        />
        {:else if index === editingItemIndex}
        <svelte:component
            this={editComponent}
            {value}
            updated={handleUpdated(index)}
            canceled={handleCanceled(index)}
        />
        {:else}
        <svelte:component
            this={viewComponent}
            {value}
        />
        {/if}
        {#if index === focusedItemIndex  && focusedItemIndex !== editingItemIndex}
        <hr>
        <div>
            <button class="btn" type="button" on:click={(e)=>editingItemIndex=index}><i class="bi bi-pencil-fill"></i></button>
            <button class="btn" type="button" on:click={(e)=>handleRemoveItem(index)}><i class="bi bi-trash3"></i></button>
        </div>
        {/if}
    </li>
    {/each}
</ul>
