import type { Meta, StoryObj } from "@storybook/svelte";
import { generatePromiseData } from "./loadingTable";
import LoadingTable from "../components/loading-table/LoadingTable.svelte";
import { generateHeader } from "./table";

const meta = {
    title: 'Loading_Table/Basic',
    component: LoadingTable,
    tags: ['autodocs'],
    argTypes: {

    },
} satisfies Meta<LoadingTable>;
export default meta;
type Story = StoryObj<typeof meta>;

const header = generateHeader(2)
let promiseData = generatePromiseData(5, header.map(h=>h.dataAccessor))
let resolvedData = await promiseData

export const Loading: Story = {
    args: {
        status: "loading",
        header: header,
        data: resolvedData,
    },
};
