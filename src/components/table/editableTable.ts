import type { SvelteComponent } from 'svelte';
import type { Presentation, PropertyComponent } from "./table"
import Text from "./Text.svelte"
import Input from './Input.svelte';
import PropertyContainer from './PropertyContainer.svelte';


export interface Property {
    name: string
    presentType: PresentType
}

export type PresentType = 'text'|'number'|'data'|string

export interface Validation {
    isValid: boolean
    messages?: string[]
}

export interface EditablePropertyComponent extends PropertyComponent {
    getUpdated: (compoent:SvelteComponent)=>any
    validate?: (property: any) => Validation
}

export interface PropertyPresentation {
    view: PropertyComponent
    edit: EditablePropertyComponent
}

const textPropertyPresentation: (props: any)=>PropertyPresentation = (props: any) => {
    return {
        view: {
            component: PropertyContainer,
            props: {
                propertyComponent: {
                    component: Text,
                    props: {}
                },
                ...props
            }
        },
        edit: {
            component: PropertyContainer,
            props: {
                propertyComponent: {
                    component: Input,
                    props: {}
                },
                ...props
            },
            getUpdated: (comp: SvelteComponent)=>{
                comp.getValue()
            }
        }
    }
}

export let propType2presentation = new Map(
    [
        ['text', textPropertyPresentation]
    ]
)

export function buildPresentation(properties: Property[], editable: boolean, editMethod: Set<string>, editingProperty: any) {
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

export type EditMethod = 'click-property'
