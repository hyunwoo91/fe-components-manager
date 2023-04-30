export interface PropertyComponent {
    viewComponent: PropertyViewComponent
    editComponent: PropertyEditComponent
}

export interface CustomPropertyComponent extends PropertyComponent {
    updateCallback: (property: any) => null|undefined
}

export interface Validation {
    isValid: boolean
    messages?: string[]
}

export interface PropertyViewComponent {
    component: any
    props: any
}

export interface PropertyEditComponent extends PropertyViewComponent {
    validate?: (property: any) => Validation
}

export enum EditMethod {
    ByAction,
    ByTarget
}

export enum EditTarget {
    Property,
    Item
}