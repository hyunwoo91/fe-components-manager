import type { Meta, StoryObj } from '@storybook/svelte';
import Table from '../components/Table.svelte';
import type { PropertyComponent } from '../components/table/table'
import Text from '../components/table/Text.svelte';
import Input from '../components/table/Input.svelte';

const meta = {
    title: 'Example/Table',
    component: Table,
    tags: ['autodocs'],
    argTypes: {

    },
} satisfies Meta<Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const header = ["col-1", "col-2", "col-3"]
const promiseData = generatePromiseData(20)
async function generatePromiseData(size: number): Promise<any[]> {
    const data = generateData(size)
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), 3000)
    })
}
function generateData(size: number) : any[] {
    const data = []
    for(let i = 0; i < size; i++) {
        const item: any = {}
        for(const [j, col] of header.entries()) {
            item[col] = `prop-${j}`
        }
        data.push(item)
    }
    return data
}

export const Default: Story = {
    args: {
        header: header,
        data: promiseData,
    },
};

const samplePropComp1: PropertyComponent = {
    component : Text,
    props : {}
}

const samplePropComp2: PropertyComponent = {
    component : Input,
    props : {}
}

const presentation = new Map(
    [
        [1, samplePropComp1],
        [2, samplePropComp2]
    ]
)

export const Presentation: Story = {
    args: {
        header: header,
        data: promiseData,
        presentation: presentation
    },
};