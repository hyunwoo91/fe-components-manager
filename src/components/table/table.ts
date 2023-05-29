import type { ComponentType, SvelteComponentTyped } from 'svelte';

export interface HeadBase {
    title: string
    icon?: string
    className?: string[]
    iconDesc?: string
}

export interface HeadItem extends HeadBase {
    dataAccessor: string
}

export interface PropConstraint {
    property: any // Declaration required; automatic injection
}

export interface PropContainerConstraint extends PropConstraint {
    propertyComponent: PropertyComponent // Declaration required; automatic injection
}

type Constraint = SvelteComponentTyped<PropConstraint>;
type ContainerConstraint = SvelteComponentTyped<PropContainerConstraint>;


export interface PropertyComponent {
    component: ComponentType<Constraint>|ComponentType<ContainerConstraint>
    props: any
}

interface ActionConstraint {
    item: any
}
export type ActionComponent = ComponentType<SvelteComponentTyped<ActionConstraint>>
export interface Action {
    component: ActionComponent
    props?: object
}

export interface ActionsOption {
    title?: string
    showEvents?: Set<string>
    hideEvents?: Set<string>
    actions: Action[]
    at: "popover"|"first"|"last"
}

export enum EditMethod {
    ByAction,
    ByTarget
}

export enum EditTarget {
    Property,
    Item
}

type ItemIndex = number
type PropIndex = number
export type Presentation = Map<PropIndex, PropertyComponent|Map<ItemIndex, PropertyComponent>>

export const isPropertyComponent = (target: any): target is PropertyComponent => {
    if (!target) return false
    if (target instanceof Map) return false
    return true
}

export interface ClickPropertyEventDetail {
    property: any
    itemIndex: number
    propIndex: number
    dataSize: number
}

export function getPresentation(presentation: Presentation|undefined, colIndex: number, rowIndex: number) {
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
