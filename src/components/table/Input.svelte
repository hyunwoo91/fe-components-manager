<script>
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
</script>

<input bind:this={innerEl} value={property}/>
