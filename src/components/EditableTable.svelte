<script>
	import Table from "./Table.svelte";
    import { buildPresentation } from "./table/editableTable"; 

	/**
	 * @type {import("./table/editableTable").Property[]}
	 */
	export let properties
	/**
	 * @type {any}
	 */
	export let data

    $: presentation = buildPresentation(properties)
</script>

<Table
    header={properties.map(p => p.name)}
    {presentation}
    {data}
    {...$$restProps}
>
</Table>
