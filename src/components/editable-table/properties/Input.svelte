<!-- To suppoert '<svelte:component bind:this>' --> 
<svelte:options accessors={true}/>

<script>
	import { createEventDispatcher, onMount } from 'svelte';
    import { createPopper } from "@popperjs/core"
	import ValidationMessage from './common/ValidationMessage.svelte';
	import KeyIcon from './common/KeyIcon.svelte';

    export const getValue = () => {
        let value = innerEl.value
        if (process) {
            value = process(value)
        }
        return value
    }
    /**
     * @type {any}
     */
    export let property
    /**
	 * @type {number}
	 */
    export let propIndex
    /**
     * @type {(prop: any)=>import('../editableTable').Validation}
     */
    export let validate = (prop) => {
        return {
            isValid : true
        }
    }
    /**
     * @type {((prop: any)=>any)|undefined}
     */
    export let process = undefined

    /**
     * @type {"inline"|"modal"}
     */
    export let on = "inline"

    onMount(()=> {
        if (on !== "inline") return

        messagePopper = createPopper(innerEl, messageEl, {
				placement: 'bottom-start'
		})
        innerEl.focus()
    })

    /**
     * @type {HTMLInputElement}
     */
    let innerEl;
    /**
     * @type {HTMLElement}
     */
    let messageEl
    /**
     * @type {import('@popperjs/core').Instance}
     */
    let messagePopper
    $: {
        if (messagePopper && message) {
            messagePopper.update()
        }
    }

    /**
     * @type {string|undefined}
     */
    let message
    /**
	 * @type {ValidationMessage}
	 */
    let messageComp
    /**
	 * @param {any} event
	 */
    function handleKeyUp(event) {
        if (event.keyCode === 13) {
            let value = innerEl.value
            if (process) value = process(value)
            const validation = validate(value)
            if (!validation.isValid) {
                if (messageComp) {
                    messageComp.restartShake()
                }
                return
            }
            dispatch("updateProperty", {property: value, propIndex: propIndex})
        } else if (event.keyCode === 27) {
            dispatch("cancelUpdate")
        }
    }

    /**
	 * @param {any} event
	 */
    function handleInput(event) {
        let value = innerEl.value
        if (process) value = process(value)
        const validation = validate(value)
        innerEl.value = value
        message = validation.messages?.join(" ")
    }
    
    const dispatch = createEventDispatcher()

    /**
	 * @param {HTMLElement} keyIconEl
	 */
    function onMountKeyIcon(keyIconEl) {
        const refRect = innerEl.getBoundingClientRect()
        const iconTop = innerEl.clientTop + (refRect.height - keyIconEl.clientHeight)/2
        const iconRight = 5
        keyIconEl.style.top = iconTop + "px"
        keyIconEl.style.right = iconRight + "px"
    }
</script>

<div class="wrapper">
    <input
        class="form-control"
        bind:this={innerEl}
        value={property}
        on:keyup={on==="inline" ? handleKeyUp : undefined}
        on:input={handleInput}
    />
    {#if on==="inline" && innerEl}
    <KeyIcon
        title={"enter key"}
        onMount={onMountKeyIcon}
    >
        <i class="bi bi-arrow-return-right"/>
    </KeyIcon>
    {/if}
    <ValidationMessage
        bind:this={messageComp}
        bind:wrapperEl={messageEl}
        {message}
        messageStyle={on==="inline"?"popper":"block"}
    />
</div>

<style>
    input.form-control {
        position: relative;
    }
    div.wrapper {
        position: relative;
    }
</style>
