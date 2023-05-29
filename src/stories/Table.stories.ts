import type { Meta, StoryObj } from '@storybook/svelte';
import type { HeadItem, PropertyComponent } from '../components/table/table'
import Text from '../components/editable-table/properties/Text.svelte';
import { generateData, generateHeader } from './table';
import Table from '../components/table/Table.svelte';

const meta = {
    title: 'Table/Basic',
    component: Table,
    tags: ['autodocs'],
    argTypes: {

    },
} satisfies Meta<Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const header: HeadItem[] = generateHeader(3)
const data = generateData(20, header.map(h=>h.dataAccessor))

export const Default: Story = {
    args: {
        header: header,
        data: data,
    },
};

const samplePropComp1: PropertyComponent = {
    component : Text,
    props : {className:["text-primary"]}
}

const samplePropComp2: PropertyComponent = {
    component : Text,
    props : {className:["text-danger"]}
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
        data: data,
        presentation: presentation
    },
};
