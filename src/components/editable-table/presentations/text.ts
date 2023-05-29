import type { PropertyPresentation } from "../editableTable";
import Input from "../properties/Input.svelte";
import Text from "../properties/Text.svelte";
import PropertyContainer from "../properties/containers/PropertyContainer.svelte";
import PropertyEditContainer from "../properties/containers/PropertyEditContainer.svelte";

export const textPropertyPresentation: PropertyPresentation = {
    view: {
        component: PropertyContainer,
        props: {
            propertyComponent: {
                component: Text,
                props: {}
            },
        }
    },
    edit: {
        component: PropertyEditContainer,
        props: {
            propertyComponent: {
                component: Input,
                props: {}
            },
        }
    }
}
