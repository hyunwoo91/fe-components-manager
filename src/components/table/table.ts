import type { ComponentType, SvelteComponentTyped } from 'svelte';

export interface PropConstraint {
    property: any
}

type Constraint = SvelteComponentTyped<PropConstraint>;

export interface PropertyComponent {
    component: ComponentType<Constraint>
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

export const isPropertyComponent = (target: any): target is PropertyComponent => {return true}