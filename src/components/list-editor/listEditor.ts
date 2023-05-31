import type { ComponentType, SvelteComponentTyped } from "svelte"

export type Mode = "viewer"|"editor"
export type ActionShowingStyle = "hover"

export type Removed = (removedValue:unknown)=>void
export type Updated = (updatedValue:unknown)=>void
export type Canceled = ()=>void

interface ListItemPropConstraint {
    value: unknown
}

interface EditableListItemPrompConstraint extends ListItemPropConstraint {
    updated: Updated
    canceled: Canceled
}

export type ListItemComponentTyped = ComponentType<SvelteComponentTyped<ListItemPropConstraint>>
export type EditableListItemComponentTyped = ComponentType<SvelteComponentTyped<EditableListItemPrompConstraint>>