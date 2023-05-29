<script>
	import Tag from "../Tag.svelte";

    /**
	 * @type {import("./dataFilter").FilterSchema[]}
	 */
    export let filterSchemata = []

    /**
     * @type {(filter:import("./dataFilter").Filter|undefined, status:string, filters:import("./dataFilter").Filter[])=>void} 
     */
    export let onFilterChanged

    /**
     * @type {import("./dataFilter").Filter[]}
     */
    let filters = []

    /**
	 * @param {import("./dataFilter").Filter} filter
	 */
    function addNewFilter(filter) {
        filters.push(filter)
        onFilterChanged(filter, "added", filters)
    }

    /**
	 * @param {any} event
     * @param {import("./dataFilter").Filter} filter
	 */
    function prepareEditFilter(event, filter) {
        // TODO
        onFilterChanged(filter, "updated", filters)
    }

    /**
	 * @param {any} event
     * @param {import("./dataFilter").Filter} filter
	 */
    function removeFilter(event, filter) {
        const found = filters.findIndex(f => f === filter)
        if (found >= 0) {
            filters.splice(found, 1)
            onFilterChanged(filter, "removed", filters)
        }
    }

    function clearAllFilters() {
        filters = []
        onFilterChanged(undefined, "cleared", filters)
    }

    /**
	 * @param {import("./dataFilter").Filter} filter
     * @returns {string}
	 */
    function toString(filter) {
        return `${filter.schema.target}:${filter.schema.filterSpec.op}:${JSON.stringify(filter.values)}`
    }

    /**
	 * @param {import("./dataFilter").Filter} filter
     * @returns {string}
	 */
    function generateId(filter) {
        return toString(filter)
    }
</script>

<div class="data-filter-wrapper">
    <div class="data-filter-header">

    </div>
    <div class="data-filter-filters d-flex">
        {#each filters as filter (generateId(filter))}
        <Tag
            name={filter.schema.toString? filter.schema.toString(filter.values) : toString(filter)}
            data={filter}
            onClick={prepareEditFilter}
            onClickSecondary={removeFilter}
        />
        {/each}
    </div>
</div>
