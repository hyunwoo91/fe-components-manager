<script>
	import { getPresentation } from "./table";
	import { createPopper } from "@popperjs/core"

	// html & css
	/**
	 * @type {string[]}
	 */
	export let classNameOfTableWrapper = []
	/**
	 * @type {string[]}
	 */
	export let classNameOfTable = []
	/**
	 * @type {string[]}
	 */
	export let classNameOfTableHead = []
	export let classNameOfTableBody = ["table-group-divider"]
	/**
	 * @type {Array<string[]>}
	 */
	export let classNameOfPropertyColumns = []
	export let classNameOfNumbering = ["text-secondary", "fw-light", "text-center"]
	export let classNameOfActions = ["d-flex justify-content-center"]

	/**
	 * @type {HTMLElement|undefined}
	 */
	export let tableWrapperEl = undefined
	/**
	 * @type {HTMLElement|undefined}
	 */
	export let tableEl = undefined
	export let tableWidth = undefined
	export let tableHeight = undefined

	// data
	/**
	 * @type {import("./table").HeadItem[]}
	 */
	export let header
	/**
	 * @type {any}
	 */
	export let data
	export let itemIdentifier = "_id"

	// data presentation
	/**
	 * @type {import("./table").Presentation|undefined}
	 */
	export let presentation = undefined

	// meta data
	/**
	 * @type {string|undefined}
	 */
	export let numberingTitle = undefined
	export let numbering = true
	export let startNumber = 1
	/**
	 * @type {string|undefined}
	 */
	export let caption = undefined

	// interaction
	/**
	 * @type {((event: any, itemId: any) => void)|undefined}
	 */
	export let callbackRowClicked = undefined
	/**
	 * @type {import("./table").ActionsOption|undefined}
	 */
	export let actions = undefined

	$: generatedHeader = generateHeader(header)

	/**
	 * @param {import("./table").HeadItem[]} header
	 * @returns {import("./table").HeadBase[]}
	 */
	function generateHeader(header) {
		/**
		 * @type {import("./table").HeadBase[]}
		 */
		const generated = [...header]
		const actionsTitle = actions && actions.title ? actions.title : "actions"
		const actionsHeadItem = {title: actionsTitle, className: ["text-center", "actions-head"]}
		if (actions && actions.at === "first") {
			generated.splice(0, 0, actionsHeadItem)
		}
		if (numbering) {
			generated.splice(0, 0, {title: numberingTitle? numberingTitle : "#", className: ["text-center", "numbering-head"]})
		}
		if (actions && actions.at === "last") {
			generated.splice(generated.length, 0, actionsHeadItem)
		}
		return generated
	}

	/**
	 * @type {any}
	 */
	let foucsedItem
	/**
	 * @param {HTMLElement} actionsContainer
	 * @param {import("@popperjs/core").Instance | undefined} popperInstance
	 * @param {Event} event
	 * @param {any} item
	 */
	function show(event, item, actionsContainer, popperInstance) {
		foucsedItem = item
		actionsContainer.removeAttribute('hidden');
		if (popperInstance) {
			popperInstance.update();
		}
	}
	/**
	 * @param {HTMLElement} actionsContainer
	 * @param {Event} event
	 */
	function hide(event, actionsContainer) {
		actionsContainer.setAttribute('hidden', '');
	}
	/**
	 * @param {HTMLTableRowElement} node
	 * @param {any} param
	 */
	function onMountTableRow(node, param) {
		const [item, itemIndex] = param
		if (!actions || !actions.showEvents) return
		if (!(["popover"].includes(actions.at))) return

		let foundActions = document.getElementById("row-actions")
		if (!foundActions) return
		let actionsContainer = foundActions
		/**
		 * @type {import("@popperjs/core").Instance | undefined}
		 */
		const popperInstance = createPopper(node, actionsContainer, {
				placement: 'left',
				modifiers: [
					{
						name: "offset",
						options: {
							offset: [0, 5]
						}
					},
					{
						name: "eventListeners",
						options: {
							scroll: true
						}
					}
				]
		})
		actions.showEvents.forEach((event) => {
			node.addEventListener(event, (e)=>show(e, item, actionsContainer, popperInstance));
		});
		window.addEventListener('scroll', (e)=>hide(e, actionsContainer))

		return {
			destroy() {
				popperInstance.destroy()
			}
		}
	}

	/**
	 * @param {HTMLElement} node
	 */
	function onMountRowActions(node) {
		if (!actions || !actions.hideEvents) return
		actions.hideEvents.forEach((event) => {
			node.addEventListener(event, (e)=>hide(e, node));
		});
	}
</script>

<div
	bind:this={tableWrapperEl}
	class={classNameOfTableWrapper.join(" ") + " position-relative"}>
	<table
		bind:this={tableEl}
		bind:offsetWidth={tableWidth}
		bind:offsetHeight={tableHeight}
		class={["table", ...classNameOfTable].join(" ") + " position-relative"}
	>
		{#if caption}
		<caption>{caption}</caption>
		{/if}
		<thead class={classNameOfTableHead.join(" ")}>
			<tr>
				{#each generatedHeader as headerItem}
				<th
					class={headerItem.className? headerItem.className.join(" ") : ""}
					scope="col"
				>
					{#if headerItem.icon}
					<i class={headerItem.icon + " me-1"} title={headerItem.iconDesc? headerItem.iconDesc: ""}></i>
					{/if}
					{@html headerItem.title}
				</th>
				{/each}
			</tr>
		</thead>
		<tbody class={classNameOfTableBody.join(" ")}>
		{#if !data || data.length == 0}	
		<tr>
			<th scope="row" colspan={generatedHeader.length}>no data</th>
		</tr>
		{:else}
			{#each data as item, itemIndex (item[itemIdentifier] ? item[itemIdentifier] : item)}
			{@const itemId = itemIdentifier && item[itemIdentifier] !== undefined ? item[itemIdentifier] : item}
			<tr
				use:onMountTableRow={[item, itemIndex]}
				on:click={callbackRowClicked? (/** @type {any} */ e)=>callbackRowClicked?.(e, itemId) : undefined}
			>
				{#if numbering}
				<th class={classNameOfNumbering.join(" ")} scope="row">{startNumber + itemIndex}</th>
				{/if}
				{#if actions && actions.at === "first"}
				<th class={classNameOfActions.join(" ")}>
					{#each actions.actions as action}
					<svelte:component this={action.component} {item} {...action.props} />
					{/each}
				</th>
				{/if}
				{#each header as headerItem, propIndex}
				{@const propertyComponent = getPresentation(presentation, propIndex, itemIndex)}
				<td class={classNameOfPropertyColumns[propIndex] ? classNameOfPropertyColumns[propIndex].join(" ") : ""}>
					{#if propertyComponent}
						{#if propertyComponent.props.hasOwnProperty('propertyComponent')}
						<svelte:component
							this={propertyComponent.component}
							property={item[headerItem.dataAccessor]}
							itemId = {itemId}
							{itemIndex}
							{propIndex}
							dataSize={data.length}
							{...propertyComponent.props}
							on:clickProperty
							on:updateProperty
							on:cancelUpdate
						/>
						{:else}
						<svelte:component
							this={propertyComponent.component}
							property={item[headerItem.dataAccessor]}
							{...propertyComponent.props}
						/>
						{/if}
					{:else}
						{item[headerItem.dataAccessor]}
					{/if}
				</td> 
				{/each}
				{#if actions && actions.at === "last"}
				<th class={classNameOfActions.join(" ")}>
					{#each actions.actions as action}
					<svelte:component this={action.component} {item} {...action.props}/>
					{/each}
				</th>
				{/if}
			</tr>
			{/each}
		{/if}
		</tbody>
		<tfoot>
		</tfoot>
	</table>
</div>
{#if actions && actions.at === 'popover'}
<div
	id="row-actions"
	hidden
	use:onMountRowActions
>
	{#each actions.actions as action}
	<svelte:component this={action.component} item={foucsedItem} {...action.props}/>
	{/each}
</div>
{/if}

<style>
	th.numbering-head {
		width: 0%;
	}
	th.actions-head {
		width: 0%
	}
</style>