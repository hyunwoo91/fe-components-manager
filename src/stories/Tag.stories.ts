import type { Meta, StoryObj } from "@storybook/svelte";
import Tag from "../components/Tag.svelte"

const meta = {
    title: 'Tag/Basic',
    component: Tag,
    tags: ['autodocs'],
    argTypes: {
        className : {
            control: 'object'
        },
        name : {
            control: 'text'
        },
        tooltip : {
            control: 'text'
        }

    },
} satisfies Meta<Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

function handleClick(event: any) {
    console.log('Click')
}

function handleSecondaryClick(event: any) {
    console.log('secondaryClick')
}

export const Default: Story = {
    args: {
        name: "sample tag",
        onClick: handleClick,
        onClickSecondary: undefined
    },
}

export const SecondaryButton: Story = {
    args: {
        name: "sample tag",
        onClick: handleClick,
        onClickSecondary: handleSecondaryClick
    },
}
