<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf'
    import ListEditor from '../components/list-editor/ListEditor.svelte'
    import Input from '../components/list-editor/item-components/Input.svelte'
    import Text from '../components/list-editor/item-components/Text.svelte'

    let values=["text 1", "text 2"]
</script>

<Meta
    title='List Editor/Basic'
    component={ListEditor}
/>

<Template let:args>
    <ListEditor
        bind:values={values}
        viewComponent={Text}
        editComponent={Input}
        {...args}
    >
    </ListEditor>
</Template>

<Story name="Default" />
