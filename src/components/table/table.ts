import type { ComponentType, SvelteComponentTyped } from 'svelte';

export interface PropConstraint {
    property: any
}

export interface PropContainerConstraint extends PropConstraint {
    propertyComponent: PropertyComponent
}

type Constraint = SvelteComponentTyped<PropConstraint>;
type ContainerConstraint = SvelteComponentTyped<PropContainerConstraint>;


export interface PropertyComponent {
    component: ComponentType<Constraint>|ComponentType<ContainerConstraint>
    props: any
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
