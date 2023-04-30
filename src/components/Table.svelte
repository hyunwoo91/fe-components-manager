<script>
	import { isPropertyComponent } from "./table/table";
	// html & css
	/**
	 * @type {string[]}
	 */
	export let classNameOfTable = []
	export let classNameOfTableBody = ["table-group-divider"]

	// data
	/**
	 * @type {string[]}
	 */
	export let header
	/**
	 * @type {any}
	 */
	export let data
	export let itemIdentifier = "_id"

	// data presentation
	/**
	 * @type {import("./table/table").Presentation|undefined}
	 */
	export let presentation = undefined

	// meta data
	export let numbering = true
	/**
	 * @type {string|undefined}
	 */
	export let caption = undefined

	// interaction
	/**
	 * @type {((event: any, itemId: any) => void)|undefined}
	 */
	export let callbackRowClicked = undefined

	function getColumnsCount() {
		let count = header.length
		if (numbering) count += 1
		return count
	}

	/**
	 * @param {import("./table/table").Presentation|undefined} presentation
	 * @param {number} colIndex
	 * @param {number} rowIndex
	 */
	function getPresentation(presentation, colIndex, rowIndex) {
		if (!presentation) {
			return
		}
		if (!presentation.has(colIndex)) {
			return
		}
		const columnPropropertyComponent = presentation.get(colIndex)
		if (isPropertyComponent(columnPropropertyComponent)) {
			return columnPropropertyComponent
		}
		return columnPropropertyComponent?.get(rowIndex)
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
		<tr on:click={callbackRowClicked? (e)=>callbackRowClicked?.(e, itemId) : undefined}>
			{#if numbering}
			<th scope="row">{itemIndex + 1}</th>
			{/if}
			{#each header as propName, propIndex}
			{@const propertyComponent = getPresentation(presentation, propIndex, itemIndex)}
			<td>
				{#if propertyComponent}
					<svelte:component this={propertyComponent.component} property={item[propName]} {...propertyComponent.props}/>
				{:else}
					{item[propName]}
				{/if}
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
