<script>
    /**
     * @type {string}
     */
    export let value
    /**
     * @type {import("../listEditor").Updated}
     */
    export let updated
    /**
     * @type {import("../listEditor").Canceled}
     */
    export let canceled

    /**
	 * @type {HTMLInputElement}
	 */
    let inputEl

    function handleDone() {
        updated(inputEl.value)
    }

    function handleCancel() {
        canceled()
    }
</script>

<div>
    <input class="form-control mb-2" bind:this={inputEl} {value}/>
    <div class="d-flex justify-content-end">
        <button class="btn btn-success mx-1" on:click={handleDone}>done</button>
        <button class="btn btn-secondary mx-1" on:click={handleCancel}>cancel</button>
    </div>
</div>
