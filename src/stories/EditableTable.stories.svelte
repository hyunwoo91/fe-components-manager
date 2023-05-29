<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import EditableTable from '../components/editable-table/EditableTable.svelte'
    import CopyAction from '../components/table/actions/CopyAction.svelte';
    import { generateData } from "./table";
	import type { CustomPropertyPresentations, Property, PropertyPresentation } from '../components/editable-table/editableTable';
    import PropertyContainer from '../components/editable-table/properties/containers/PropertyContainer.svelte';
    import PropertyEditContainer from '../components/editable-table//properties/containers/PropertyEditContainer.svelte';
    import Input from '../components/editable-table/properties/Input.svelte';
    import Text from '../components/editable-table/properties/Text.svelte';

    const properties: Property[] = [
        {"title": "col 1", "name": "col-1", "presentType": "text"},
        {"title": "col 2", "name": "col-2", "presentType": "text"}
    ]

    const itemIdentifier = "_id"
    function generateDataWithId(size: number, header: string[]) {
        const data = generateData(size, header)
        data.forEach((d, idx)=>d[itemIdentifier] = idx)
        return data
    }

    async function generatePromiseData(
        size: number,
        header: string[],
        replace: Map<number, any>|undefined = undefined): Promise<any[]> {
        const data = generateDataWithId(size, header)
        if (replace) {
            for (let [id, updatedProps] of replace) {
                const foundIndex = data.findIndex(item => item[itemIdentifier]===id)
                if (foundIndex > -1) {
                    for (let [propName, propValue] of Object.entries(updatedProps)) {
                        data[foundIndex][propName] = propValue
                    }
                }
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(data), 3000)
        })
    }
    let promiseData = generatePromiseData(20, properties.map(prop=>prop.name))

    function updateProperty(itemId: any, property: Property, value: any) {
        let replace = new Map()
        let newPropValue: any = {}
        newPropValue[property.name] = value
        replace.set(itemId, newPropValue)
        promiseData = generatePromiseData(20, properties.map(prop=>prop.name), replace)
    }

    function updateItem(prevItem: any, item: any) {
        let replace = new Map()
        replace.set(prevItem[itemIdentifier], item)
        promiseData = generatePromiseData(20, properties.map(prop=>prop.name), replace)
    }

    const customPropertyPresentation: PropertyPresentation = {
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
                validate: (value: string)=>{
                    if (value.startsWith("_")) {
                        return {
                            isValid: false,
                            messages: ["cannot start with '_'(under dash)"]
                        }
                    } else {
                        return {
                            isValid: true
                        }
                    }
                },
                process: (value: string)=>{
                    return value.trim()
                }
            }
        }
    }
    const customPropertyType = "custom"
    const customPropertyPresentations: CustomPropertyPresentations = new Map([
        [customPropertyType, {presentation: customPropertyPresentation, icon: "bi bi-balloon-heart-fill"}]
    ])
    const customProperties: Property[] = [
        {"title": "col 1", "name": "col-1", "presentType": "text", "shouldWrapping": true},
        {"title": "col 2", "name": "col-2", "presentType": customPropertyType}
    ]
    const globalClassNameOfTableWrapper = ["table-responsive"]
</script>

<Meta
    title='Editable_Table/Basic'
    component={EditableTable}
/>

<Template let:args>
    <EditableTable
        classNameOfTableWrapper={globalClassNameOfTableWrapper}
        classNameOfTable={["table-hover", "table-bordered", "align-middle"]}
        classNameOfTableHead={["table-light", "text-secondary", "text-opacity-75"]}
        data={promiseData}
        properties={properties}
        {itemIdentifier}
        callbackOfUpdateProperty={updateProperty}
        callbackOfUpdateItem={updateItem}
        {...args}
    >
    </EditableTable>
</Template>

<Story name="Default" />

<Story
    name="Popover"
    args={{
        classNameOfTableWrapper:[...globalClassNameOfTableWrapper, "ms-3"],
        actions: {
            showEvents: new Set(['mouseenter']),
            hideEvents: new Set(['mouseleave']),
            actions: [{component:CopyAction}],
            at: 'popover'
        }
    }}
/>

<Story
    name="First"
    args={{
        actions: {
            actions: [{component: CopyAction}],
            at: 'first'
        }
    }}
/>

<Story
    name="Last"
    args={{
        actions: {
            title: '<i class="bi bi-gear-fill"></i>',
            actions: [{component: CopyAction}],
            at: 'last'
        }
    }}
/>

<Story
    name="Custom Property Type"
    args={{
        classNameOfTableWrapper:[...globalClassNameOfTableWrapper, "ms-3"],
        properties: customProperties,
        customPropertyPresentations: customPropertyPresentations
    }}
/>
