<script>
	import { createEventDispatcher } from 'svelte';

    export function getValue() {
        return innerEl.value
    }
    /**
     * @type {any}
     */
    export let property

    /**
     * @type {HTMLInputElement}
     */
    let innerEl;

    /**
	 * @param {any} event
	 */
    function handleKeyUp(event) {
        if (event.keyCode === 13) {
            dispatch("updateProperty", {property: innerEl.value})
        }
    }
    const dispatch = createEventDispatcher()
</script>

<input
    class="form-control"
    bind:this={innerEl}
    value={property}
    on:keyup={handleKeyUp}
/>
