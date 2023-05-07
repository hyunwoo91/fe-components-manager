<script>
	import { getPresentation } from "./table/table";

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

	export let offsetWidth = undefined;
	export let offsetHeght = undefined;
</script>

<table
	bind:offsetWidth={offsetWidth}
	bind:offsetHeight={offsetHeght}
	class={["table", ...classNameOfTable].join(" ")}
>
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
	{#if !data || data.length == 0}	
	<tr>
		<th scope="row" colspan={getColumnsCount()}>no data</th>
	</tr>
	{:else}
		{#each data as item, itemIndex (item[itemIdentifier] ? item[itemIdentifier] : item)}
		{@const itemId = itemIdentifier && item[itemIdentifier] !== undefined ? item[itemIdentifier] : item}
		<tr on:click={callbackRowClicked? (e)=>callbackRowClicked?.(e, itemId) : undefined}>
			{#if numbering}
			<th scope="row">{itemIndex + 1}</th>
			{/if}
			{#each header as propName, propIndex}
			{@const propertyComponent = getPresentation(presentation, propIndex, itemIndex)}
			<td>
				{#if propertyComponent}
					{#if propertyComponent.props.hasOwnProperty('propertyComponent')}
					<svelte:component
						this={propertyComponent.component}
						property={item[propName]}
						itemId = {itemId}
						{itemIndex}
						{propIndex}
						dataSize={data.length}
						{...propertyComponent.props}
						on:clickProperty
						on:updateProperty
					/>
					{:else}
					<svelte:component
						this={propertyComponent.component}
						property={item[propName]}
						{...propertyComponent.props}
					/>
					{/if}
				{:else}
					{item[propName]}
				{/if}
			</td> 
			{/each}
		</tr>
		{/each}
	{/if}
	</tbody>
	<tfoot>
	</tfoot>
</table>
