<script>
    /**
	 * @type {string}
	 */
    export let title
    /**
	 * @type {(arg0: HTMLElement) => any}
	 */
    export let onMount
</script>

<kbd title={title} use:onMount class="key-icon">
    <slot />
</kbd>

<style>
    kbd.key-icon {
        background-color: rgba(128, 128, 128, 0.065);
        position: absolute;
        color:rgba(0, 0, 0, 0.357);
    }
</style>
