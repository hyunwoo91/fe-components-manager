import type { SvelteComponent } from 'svelte';
import type { Presentation, PropertyComponent } from "./table"
import Text from "./Text.svelte"
import Input from './Input.svelte';


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

const textPropertyPresentation: PropertyPresentation = {
    view: {
        component: Text,
        props: {}
    },
    edit: {
        component: Input,
        props: {},
        getUpdated: (comp: SvelteComponent)=>{
            comp.getValue()
        }
    }
}

export let propType2presentation = new Map(
    [
        ['text', textPropertyPresentation]
    ]
)

export function buildPresentation(properties: Property[]) {
    if (!properties) {
        return
    }
    let presentations: Presentation = new Map()
    for(let i = 0; i < properties.length; i++) {
        const prop = properties[i]
        const presentation = propType2presentation.get(prop.presentType)
        if (presentation) {

            presentations.set(i, presentation.view)
        }
    }
    return presentations
}