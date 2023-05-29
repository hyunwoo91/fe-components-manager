<script>
    import Table from "../table/Table.svelte";
	import TableCover from "./TableCover.svelte";
    import { isPromise } from "../common";

    /**
	 * @type {Promise<any>|any}
	 */
    export let data

	/**
	 * @type {import("../table/table").HeadItem[]}
	 */
    export let header

    /**
	 * @type {"loading" | "loaded" | "failed" | undefined}
	 */
    export let status = undefined
    $: {
        if (data) {
            if (isPromise(data)) {
                status = "loading"
                data.then((/** @type {never[]} */ resolved) => {
                    status = "loaded"
                    resolvedData = resolved
                }).catch((/** @type {any} */ reason) => {
                    status = "failed"
                })
            } else {
                resolvedData = data
            }
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
	 * @type {HTMLElement|undefined}
	 */
    let tableWrapperEl
    /**
	 * @type {HTMLElement|undefined}
	 */
	let tableEl
    /**
	 * @type {any}
	 */
    let tableWidth
	/**
	 * @type {any}
	 */
	let tableHeight
</script>

<div class="loading-wrapper">
    <Table
        bind:this={tableComp}
        bind:tableWrapperEl={tableWrapperEl}
        bind:tableEl={tableEl}
        bind:tableWidth={tableWidth}
        bind:tableHeight={tableHeight}
        {header}
        data={resolvedData}
        {...$$restProps}
        on:clickProperty
        on:updateProperty
        on:cancelUpdate
    >
    </Table>
    {#if status === "loading" && tableWrapperEl && tableEl}
    <TableCover
        coverTop={tableWrapperEl.offsetTop + tableEl.offsetTop}
        coverLeft={tableWrapperEl.offsetLeft + tableEl.offsetLeft}
        coverWidth={tableWidth}
        coverHeight={tableHeight}
        coloumCount={header.length}
        rowCount={resolvedData ? resolvedData.length : 0}
    />
    {/if}
</div>

<style>
    .loading-wrapper {
        position: relative;
    }
</style>
