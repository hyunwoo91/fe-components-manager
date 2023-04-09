<script lang="ts">
    import { ListGroup, ListGroupItem, Icon } from 'sveltestrap'
    
    const idPostfix='-listgroup-94@@a'

    // options
    export let flush: boolean = false
    export let isEditing: boolean = false
    export let multiEditable: boolean = false

    // data
    export let data: any[]= []
    export let labelMap: any = {
        title: 'Title',
        subTitle: 'Sub Title',
        description: 'Description'
    }
    interface Validation {
        isValid: boolean,
        message?: string
    }
    type Validate = Validation | ((value: any) => NonNullable<Validation>)
    export let validationMap: Map<string, Validate> = new Map(Object.entries({
        title: (v: string) => {
            if (v.length === 0) {
                return {
                    isValid: false,
                    message: 'Title is required'
                }
            }
            return {
                isValid: true
            }
        },
        subTitle: {isValid: true},
    }))
    let listGroup
    export let getEditingValue: Map<string, (index:number)=>NonNullable<any>> = new Map(Object.entries({
        title: (i) => {
            return (<HTMLInputElement> document.getElementById('titleInput' + idPostfix + "-" + i))?.value
        },
        subTitle: (i) => {
            return (<HTMLInputElement> document.getElementById('subTitleInput' + idPostfix + "-" + i))?.value
        },
        description: (i) => {
            return (<HTMLInputElement> document.getElementById('descriptionInput' + idPostfix + "-" + i))?.value
        },
    }))
    export let getEditingElementToValidate: Map<string, (index:number)=>NonNullable<any>> = new Map(Object.entries({
        title: (i) => {
            return document.getElementById('titleInput' + idPostfix + "-" + i)
        },
        subTitle: (i) => {
            return document.getElementById('subTitleInput' + idPostfix + "-" + i)
        }
    }))
    
    let editingIndexes: Set<number> = new Set();

    // handlers
    function prepareEditing(event: Event, index: number) {
        if (!multiEditable) {
            editingIndexes.clear()
        }
        editingIndexes.add(index)
        editingIndexes=editingIndexes
    }

    function cancelEditing(event: Event, index: number) {
        if (!multiEditable) {
            editingIndexes.clear()
        } else {
            editingIndexes.delete(index)
        }
        editingIndexes=editingIndexes
    }

    let editForm: any
    function checkValues(event: Event, index: number) {
        if (editingIndexes.size === 0) {
            return
        }

        if (!getEditingValue) {
            cancelEditing(event, index)
            return
        }

        let allValuesOk = true
        // custom validation
        getEditingValue.forEach((getValue, field, m) => {
            const value = getValue(index)
            if (validationMap.has(field)) {
                let validation = validationMap.get(field)
                if (validation instanceof Function) {
                    validation = validation(value)
                }
                if (!validation?.isValid) {
                    allValuesOk = false
                    if (getEditingElementToValidate.has(field)) {
                        const getter = getEditingElementToValidate.get(field)
                        if (getter) {
                            const element = getter(index)
                            element.setCustomValidity(validation?.message ?? element.validationMessage)
                            element.reportValidity()
                        }
                    }
                    return
                }
            }
        })
        if (!allValuesOk) {
            return
        }
        getEditingValue.forEach((getValue, field, m) => {
            const value = getValue(index)
            data[index][field] = value
        })
        cancelEditing(event, index)
    }

    function removeItem(event: Event, index: number) {
        data.splice(index, 1)
        data=data
    }

    // utils
</script>

<ListGroup bind:this={listGroup} {flush}>
    <slot name="list-items">
        {#each data as item, itemIndex}
            <ListGroupItem>
                <div class="container-flud d-flex">
                    {#if !isEditing || editingIndexes.size > 0}
                    <div class="col-1"></div>
                    {:else}
                    <div class="col-1 d-flex item-prefix">
                        <button type="button" class="btn btn-danger btn-circle btn-icon" on:click={(event) => removeItem(event, itemIndex)}><i class="bi bi-dash"></i></button>
                    </div>
                    {/if}

                    
                    {#if !isEditing || !editingIndexes.has(itemIndex)}
                    <div class="col-9">
                        <div><h3>{item.title}</h3></div>
                        {#if item.subTitle}
                        <div><h5>{item.subTitle}</h5></div>
                        {/if}
                        {#if item.description}
                        <div><p class="item-description">{item.description}</p></div>
                        {/if}
                    </div>
                    {:else}
                    <form class="edit-form-container" bind:this={editForm}>
                        <div class="col-10 d-grid gap-2">
                            <div class="form-floating">
                                <input class="form-control" id={"titleInput" + idPostfix + "-" + itemIndex} placeholder="type here" value={item.title}/>
                                <label for={"titleInput" + idPostfix + "-" + itemIndex}>{labelMap?.title ?? 'Title'}</label>
                            </div>
                            {#if item.subTitle}
                            <div class="form-floating">
                                <input class="form-control" id={"subTitleInput" + idPostfix + "-" + itemIndex} placeholder="type here"  value={item.subTitle}/>
                                <label for={"subTitleInput" + idPostfix + "-" + itemIndex}>{labelMap?.subTitle ?? 'Sub Title'}</label>
                            </div>
                            {/if}
                            {#if item.description}
                            <div class="form-floating">
                                <input class="form-control" id={"descriptionInput" + idPostfix + "-" + itemIndex} placeholder="type here"  value={item.description}/>
                                <label for={"descriptionInput" + idPostfix + "-" + itemIndex}>{labelMap?.description ?? 'Description'}</label>
                            </div>
                            {/if}
                        </div>
                        <div class="col-2 d-flex actions">
                            <button class="btn btn-success" type="submit" on:click={(event) => checkValues(event, itemIndex)}><i class="bi bi-check"></i></button>
                            <button class="btn btn-light" on:click={(event) => cancelEditing(event, itemIndex)}><i class="bi bi-x"></i></button>
                        </div>
                    </form>
                    {/if}

                    {#if !isEditing}
                    <div class="col-2"></div>
                    {:else if !editingIndexes.has(itemIndex)}
                    <div class="col-2 d-flex actions">
                        <a href={null} class="btn" on:click={(event) => prepareEditing(event, itemIndex)}><i class="bi bi-pencil"></i></a>
                    </div>
                    {/if}
                </div>
            </ListGroupItem>
        {/each}
    </slot>
</ListGroup>

<style>
    p.item-description {
        margin: 0;
    }

    .item-prefix {
        align-items: center;
        justify-content: center;
    }

    .edit-form-container {
        display: flex;
        width: 100%;
    }

    .actions {
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .btn-circle {
        width: 30px;
        height: 30px;
		border-radius: 60px;
	}

    .btn-icon {
        padding: 0;
        border: none;
        font-size: larger;
    }
</style>
