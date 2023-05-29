import type { ComponentType, SvelteComponentTyped } from 'svelte';
import type { Presentation, PropConstraint, PropContainerConstraint, PropertyComponent } from "../table/table"

export interface Property {
    title: string
    name: string
    presentType: PresentType
    shouldWrapping?: boolean
}

export type PresentType = 'text'|'number'|'data'|string

export interface Validation {
    isValid: boolean
    messages?: string[]
}

export interface EditPropConstraint extends PropConstraint {
    propIndex: number // Declaration required; automatic injection
    getValue?: ()=>any // Declaration required; Definition needed
    validate?: (prop: any)=>Validation // Declaration required; automatic injection
    process?: ((prop: any)=>any)|undefined // Declaration required; automatic injection
}

export interface EditPropContainerConstraint extends PropContainerConstraint {
    propIndex: number // Declaration required; automatic injection
    getValue?: ()=>any // Declaration required; Definition needed
    validate?: (prop: any)=>Validation // Declaration required; automatic injection
    process?: ((prop: any)=>any)|undefined // Declaration required; automatic injection
}

type Constraint = SvelteComponentTyped<EditPropConstraint>;
type ContainerConstraint = SvelteComponentTyped<EditPropContainerConstraint>;

export type PropertyEditSvelteComponentTyped = Constraint|ContainerConstraint


export interface PropertyEditComponent extends PropertyComponent {
    component: ComponentType<Constraint>|ComponentType<ContainerConstraint>
}

export interface PropertyPresentation {
    view: PropertyComponent
    edit: PropertyEditComponent
}

interface CustomPropertyDefinition {
    presentation: PropertyPresentation
    icon?: string
}
export type CustomPropertyPresentations = Map<PresentType, CustomPropertyDefinition>

export function generatePropertyPresentation(propPresentation: PropertyPresentation) {
    return (props: any) => {
        // TODO, use deep copy
        const presentation = {...propPresentation}
        if (props) {
            presentation.view = {...propPresentation.view}
            presentation.edit = {...propPresentation.edit}
            presentation.view.props = {...propPresentation.view.props}
            presentation.edit.props = {...propPresentation.edit.props}
            Object.assign(presentation.view.props, props)
            Object.assign(presentation.edit.props, props)
        }
        return presentation
    }
}

export function buildPresentation(propType2presentation: Map<PresentType, (props: any) => PropertyPresentation>, properties: Property[], editable: boolean, editMethod: Set<string>, editingProperty: any) {
    if (!properties) {
        return
    }
    let presentations: Presentation = new Map()
    for(let i = 0; i < properties.length; i++) {
        const prop = properties[i]
        const getPresentation = propType2presentation.get(prop.presentType)
        if (getPresentation) {
            if (editingProperty && editingProperty.propIndex === i) {
                const presentation = getPresentation({editable, editMethod})
                const newPresetionation = new Map()
                // @ts-ignore
                for(let j = 0; j < editingProperty.dataSize; j++) {
                    if (j === editingProperty.itemIndex) newPresetionation.set(j, presentation.edit)
                    else newPresetionation.set(j, presentation.view)
                }
                presentations.set(editingProperty.propIndex, newPresetionation)
            } else {
                const presentation = getPresentation({editable, editMethod})
                presentations.set(i, presentation.view)
            }
        }
    }
    return presentations
}

export type EditMethod = 'click-property'|'item-edit-action'
