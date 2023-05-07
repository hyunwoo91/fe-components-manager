<script>
	import LoadingTable from "./LoadingTable.svelte";
    import {
		buildPresentation,
	} from "./table/editableTable"; 

	/**
	 * @type {import("./table/editableTable").Property[]}
	 */
	export let properties
	/**
	 * @type {any}
	 */
	export let data
	export let editable = true
	/**
	 * @type {Set<import("./table/editableTable").EditMethod>}
	 */
	export let editMethod = new Set(["click-property"])

	 /**
	 * @type {(arg0: any, arg1: import("./table/editableTable").Property, arg2: any) => void}
	 */
	  export let callbackOfUpdateProperty

	/**
	 * @type {{ propIndex: number; itemIndex: number; dataSize: number; } | undefined}
	 */
	let editingProperty = undefined
	$: {
		if (!editable || !editMethod.has("click-property")) {
			editingProperty = undefined
		}
	}
    $: presentation = buildPresentation(properties, editable, editMethod, editingProperty)

	/**
	 * @param {any} event
	 */
	function handlePropertyClicked(event) {
		/**
         * @type {import("./table/table").ClickPropertyEventDetail}
         */
		const detail = event.detail
		editingProperty = {
			propIndex : detail.propIndex,
			itemIndex : detail.itemIndex,
			dataSize : detail.dataSize
		}
	}

	/**
	 * @param {any} event
	 */
	function handlePropertyUpdate(event) {
		console.log('called handlePropertyUpdate')
		if (callbackOfUpdateProperty) {
			callbackOfUpdateProperty(event.detail.itemId, properties[event.detail.propIndex], event.detail.property)
			if (editingProperty?.propIndex === event.detail.propIndex && editingProperty?.itemIndex === event.detail.itemIndex) {
				editingProperty = undefined
			}
		}
	}
</script>

<LoadingTable
    header={properties.map(p => p.name)}
    {presentation}
    {data}
    {...$$restProps}
	on:clickProperty={editable && editMethod && editMethod.has("click-property") ? handlePropertyClicked : undefined}
	on:updateProperty={editable ? handlePropertyUpdate : undefined}
>
</LoadingTable>
