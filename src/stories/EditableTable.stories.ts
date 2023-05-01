import type { Meta, StoryObj } from "@storybook/svelte";
import EditableTable from "../components/EditableTable.svelte";
import { generatePromiseData } from "./Table";

const meta = {
    title: 'Example/EditableTable',
    component: EditableTable,
    tags: ['autodocs'],
    argTypes: {

    },
} satisfies Meta<EditableTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const properties = [
    {"name": "col-1", "presentType": "text"}
]
const promiseData = generatePromiseData(20, properties.map(prop=>prop.name))

export const Default: Story = {
    args: {
        properties: properties,
        data: promiseData,
    },
};
