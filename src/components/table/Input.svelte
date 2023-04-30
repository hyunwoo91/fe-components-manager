<script lang="ts">
export function get() {
    return innerEl.value
}
export let property: any

let innerEl: any;
</script>

<input bind:this={innerEl} value={property}/>
