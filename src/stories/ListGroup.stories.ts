import type { Meta, StoryObj } from '@storybook/svelte';
import ListGroup from '../components/ListGroup.svelte';

const meta = {
    title: 'Example/ListGroup',
    component: ListGroup,
    tags: ['autodocs'],
    argTypes: {
        isEditing: {
            control: { type: 'boolean' },
        },
        multiEditable: {
            defaultValue: false,
            control: { type: 'boolean' },
        }
    },
} satisfies Meta<ListGroup>;

export default meta;
type Story = StoryObj<typeof meta>;


const data = [
    {
        title: 'Title 1',
        subTitle: 'Sub Title 1',
        description: 'Description 1',
    },
    {
        title: 'Title 2',
        subTitle: 'Sub Title 2',
    },
    {
        title: 'Title 3',
        description: 'Description 3',
    }
]

export const View: Story = {
    args: {
        data,
        isEditing: false,
    },
};

export const Edit: Story = {
    args: {
        data,
        isEditing: true,
    },
};