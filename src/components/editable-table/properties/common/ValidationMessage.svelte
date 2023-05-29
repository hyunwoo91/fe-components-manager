<script>
    /**
     * @type {HTMLElement} 
     */
    export let wrapperEl
    /**
	 * @type {string|undefined}
	 */
    export let message

    /**
     * @type {"popper"|"block"}
     */
    export let messageStyle = "popper"

    export const restartShake = () => {
        if (innerEl) {
            innerEl.classList.remove("shake")
            void innerEl.offsetWidth
            innerEl.classList.add("shake")
        }
    }

    /**
	 * @type {HTMLElement}
	 */
    let innerEl
</script>

<div
    bind:this={wrapperEl}
>
    <div
        bind:this={innerEl}
        class={messageStyle === "popper" ? "popper-message shake" : "block-message"}
        hidden={message? false : true}
    >{message}</div>
</div>

<style>
    .popper-message {
        border-radius: 5px;
        background-color: white;
        box-shadow: 0px 1px 2px black;
        padding: 5px;
        color: rgb(255, 54, 54);
    }
    .shake {
        animation: shake 0.5s;
    }
    .block-message {
        padding: 5px;
        color: rgb(255, 54, 54);
    }

    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
</style>
