<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import EditableTable from '../components/EditableTable.svelte'
    import { generateData } from "./Table";
	import type { Property } from '../components/table/editableTable';

    const properties = [
        {"name": "col-1", "presentType": "text"},
        {"name": "col-2", "presentType": "text"}
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
        console.log('test')
    }
</script>

<Meta
    title='Example/EditableTable'
    component={EditableTable}
/>

<Template let:args>
    <EditableTable
        data={promiseData}
        properties={properties}
        {itemIdentifier}
        callbackOfUpdateProperty={updateProperty}
        {...args}
    >
    </EditableTable>
</Template>

<Story name="Default" />