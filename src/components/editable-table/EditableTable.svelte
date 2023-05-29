<script>
	import LoadingTable from "../loading-table/LoadingTable.svelte";
	import EditItemAction from "../table/actions/EditItemAction.svelte";
	import ItemEditModal from "./ItemEditModal.svelte";
    import {
		buildPresentation,
		generatePropertyPresentation,
	} from "./editableTable"; 
	import { textPropertyPresentation } from "./presentations/text"

	/**
	 * @type {import("./editableTable").Property[]}
	 */
	export let properties
	/**
	 * @type {any}
	 */
	export let data
	export let editable = true
	/**
	 * @type {Set<import("./editableTable").EditMethod>}
	 */
	export let editMethod = new Set(["click-property", "item-edit-action"])

	 /**
	 * @type {(arg0: any, arg1: import("./editableTable").Property, arg2: any) => void}
	 */
	export let callbackOfUpdateProperty

	/**
	 * @type {(arg0: any, arg1: any) => void}
	 */
	export let callbackOfUpdateItem

	/**
	 * @type {import("./editableTable").CustomPropertyPresentations | undefined}
	 */
	export let customPropertyPresentations = undefined

	/**
	 * @type {import("../table/table").ActionsOption}
	 */
	export let actions = {
		showEvents: new Set(['mouseenter']),
		hideEvents: new Set(['mouseleave']),
		actions: [
			{
				component: EditItemAction,
				props: {
					openEditModal: (/** @type {any} */ item)=>{
						editingItem = item
						isItemEditModalOpen = !isItemEditModalOpen
					}
				}
			}
		],
		at: 'popover'
	}
	/**
	 * @type {any}
	 */
	let editingItem = undefined
	let isItemEditModalOpen = false

	/**
	 * @type {"loading" | "loaded" | "failed" | undefined}
	 */
	let loadingStatus

	/**
	 * @type {{ propIndex: number; itemIndex: number; dataSize: number; } | undefined}
	 */
	let editingProperty = undefined
	$: {
		if (loadingStatus === "loading") {
			editable = false
		} else {
			editable = true
		}

		if (!editable || !editMethod.has("click-property")) {
			editingProperty = undefined
		}
	}
	/**
	 * @type {Map<import("./editableTable").PresentType, (props:any)=>import("./editableTable").PropertyPresentation>}
	 */
	let propType2presentation = new Map(
		[
			['text', generatePropertyPresentation(textPropertyPresentation)]
		]
	)
	/**
	 * @type {Map<import("./editableTable").PresentType, string>}
	 */
	let presentType2icon = new Map(
		[
			["text", "bi bi-card-text"]
		]
	)
	$: {
		if (customPropertyPresentations) {
			for (const [propType, customProp] of customPropertyPresentations) {
				propType2presentation.set(propType, generatePropertyPresentation(customProp.presentation))
				if (customProp.icon) {
					presentType2icon.set(propType, customProp.icon)
				}
			}
		}
	}

	$: classNameOfPropertyColumns = properties.map((p, idx) => {
		const className = []
		if (p.shouldWrapping) {
			className.push("text-break")
		}
		return className
	})
    $: presentation = buildPresentation(propType2presentation, properties, editable, editMethod, editingProperty)
	/**
	 * @param {any} event
	 */
	function handlePropertyClicked(event) {
		/**
         * @type {import("../table/table").ClickPropertyEventDetail}
         */
		const detail = event.detail
		editingProperty = {
			propIndex : detail.propIndex,
			itemIndex : detail.itemIndex,
			dataSize : detail.dataSize
		}
	}

	/**
	 * @param {CustomEvent} event
	 */
	function handlePropertyUpdate(event) {
		if (callbackOfUpdateProperty) {
			callbackOfUpdateProperty(event.detail.itemId, properties[event.detail.propIndex], event.detail.property)
			clearEditingProperty(event.detail)
		}
	}
	/**
	 * @param {CustomEvent} event
	 */
	function handleCancelUpdateProperty(event) {
		clearEditingProperty(event.detail)
	}
	/**
	 * @param {import("./editableTable").Property[]} properties
	 * @returns {import("../table/table").HeadItem[]}
	 */
	function property2header(properties) {
		return properties.map(p => {
			return {
				title: p.title,
				dataAccessor: p.name,
				icon: presentType2icon.get(p.presentType),
				iconDesc: p.presentType
			}
		})
	}

	/**
	 * @param {any} detail
	 */
	function clearEditingProperty(detail) {
		console.log('clear')
		if (editingProperty === undefined) return

		if (detail && detail.itemIndex != undefined && detail.propIndex != undefined) {
			if (editingProperty.propIndex === detail.propIndex && editingProperty.itemIndex === detail.itemIndex) {
				editingProperty = undefined
			}
		} else {
			editingProperty = undefined
		}
	}
</script>

<LoadingTable
	{classNameOfPropertyColumns}
    header={property2header(properties)}
    {presentation}
    {data}
	{actions}
	bind:status={loadingStatus}
    {...$$restProps}
	on:clickProperty={editable && editMethod && editMethod.has("click-property") ? handlePropertyClicked : undefined}
	on:updateProperty={editable ? handlePropertyUpdate : undefined}
	on:cancelUpdate={handleCancelUpdateProperty}
>
</LoadingTable>
<ItemEditModal
	bind:isOpen={isItemEditModalOpen}
	item={editingItem}
	{properties}
	{propType2presentation}
	handleItemUpdate={callbackOfUpdateItem}
>
</ItemEditModal>
