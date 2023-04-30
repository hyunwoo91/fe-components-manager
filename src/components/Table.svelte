
<script lang="ts">
	import Input from "./table/Input.svelte";
	import Text from "./table/Text.svelte";
	import type {PropertyComponent} from "./table/table"
	import {EditMethod, EditTarget} from "./table/table"

	const textProperty: PropertyComponent = {
    viewComponent: {
        component: Text,
        props: {}
    },
    editComponent: {
        component: Input,
        props: {}
    }
}

	// html & css
	export let classNameOfTable: string[] = []
	export let classNameOfTableBody: string[] = ["table-group-divider"]

	// data
	export let header: string[]
	export let data: Promise<any[]> = (async () => [])()
	export let itemIdentifier: string = "_id"

	// meta data
	export let numbering: boolean = true
	export let caption: string|undefined = undefined

	// interaction
	export let editable: boolean = true
	export let editMethods: EditMethod[] = [EditMethod.ByTarget]
	export let editTarget: EditTarget = EditTarget.Property

	$: isItemEditable = editable && editMethods.includes(EditMethod.ByTarget) && editTarget === EditTarget.Item
	$: isPropertyEditable = editable && editMethods.includes(EditMethod.ByTarget) && editTarget === EditTarget.Property

	function getColumnsCount() {
		let count = header.length
		if (numbering) count += 1
		return count
	}

	function prepareEditingItem() {
		console.log('test')
	}

	function prepareEditingProperty(itemId: any, propertyName: string, property: any) {
		console.log('test')
	}
</script>

<table class={["table", ...classNameOfTable].join(" ")}>
	{#if caption}
	<caption>{caption}</caption>
	{/if}
	<thead>
		<tr>
			{#if numbering}
			<th scope="col">#</th>
			{/if}
			{#each header as columnName}
			<th scope="col">{columnName}</th>
			{/each}
		</tr>
	</thead>
	<tbody class={classNameOfTableBody.join(" ")}>
	{#if !data}
		<p>no data</p>
	{:else}
		{#await data}
		<tr>
			<th scope="row" colspan={getColumnsCount()}>loading...</th>
		</tr>
		{:then resolvedData}
		{#each resolvedData as item, itemIndex (item[itemIdentifier] ? item[itemIdentifier] : item)}
		{@const itemId = item[itemIdentifier] ? item[itemIdentifier] : item}
		<tr
			on:click={isItemEditable? prepareEditingItem : undefined}
		>
			{#if numbering}
			<th scope="row">{itemIndex + 1}</th>
			{/if}
			{#each header as columnName}
			{@const property = item[columnName]}
			<td
				on:click={isPropertyEditable? (event) => prepareEditingProperty(itemId, columnName, property): undefined}
				on:keyup
			>
				<svelte:component this={textProperty.viewComponent.component} property={property} {...textProperty.viewComponent.props}/>
			</td> 
			{/each}
		</tr>
		{/each}
		{/await}
	{/if}
	</tbody>
	<tfoot>
	</tfoot>
</table>
