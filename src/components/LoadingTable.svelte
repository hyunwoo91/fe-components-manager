<script>
    import Table from "./Table.svelte";

    /**
	 * @type {Promise<any>}
	 */
    export let data
    /**
	 * @type {string[]}
	 */
    export let header

    /**
	 * @type {string | undefined}
	 */
    let status = undefined
    $: {
        if (data) {
            status = "loading"
            data.then(resolved => {
                status = "loaded"
                resolvedData = resolved
            }).catch(reason => {
                status = "failed"
            })
        }
    }
    /**
	 * @type {Table}
	 */
    let tableComp
    /**
	 * @type {never[]}
	 */
    let resolvedData = []

    /**
	 * @type {undefined|number}
	 */
    let coverWidth = undefined
    /**
	 * @type {undefined|number}
	 */
    let coverHeight = undefined
</script>

<div class="loading-wrapper">
    <Table
        bind:this={tableComp}
        bind:offsetWidth={coverWidth}
        bind:offsetHeght={coverHeight}
        {header}
        data={resolvedData}
        {...$$restProps}
        on:clickProperty
        on:updateProperty
    >
    </Table>
    {#if status === "loading" && coverWidth && coverHeight}
    <div
        class="loading-cover"
        style:width={coverWidth+'px'}
        style:height={coverHeight+'px'}
    >Loading</div>
    {/if}
</div>

<style>
    .loading-wrapper {
        position: relative;
    }
    .loading-cover {
        position:absolute;
        top: 0px;
        left: 0px;
        z-index: 10;
        background-color: rgba(128, 128, 128, 0.9)
    }
</style>
