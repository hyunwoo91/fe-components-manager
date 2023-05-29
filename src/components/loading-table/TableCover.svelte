<script>
    /**
     * @type number
     */
    export let coverTop
     /**
     * @type number
     */
    export let coverLeft
    /**
     * @type number
     */
    export let coverWidth
    /**
     * @type number
     */
    export let coverHeight
    /**
     * @type number
     */
    export let coloumCount
    /**
     * @type number
     */
    export let rowCount
    
    $: fakeHeader = new Array(coloumCount)
    $: fakeData = rowCount > 0 ? new Array(rowCount) : new Array(1)
    $: colunmWidth = coloumCount >= 12 ? 1 : Math.ceil(12/coloumCount)
</script>

<div
    class="loading-cover"
    style:top={coverTop+'px'}
    style:left={coverLeft+'px'}
    style:width={coverWidth+'px'}
    style:height={coverHeight+'px'}
>
    <table class="table table-bordered">
        <thead class="table-light">
            <tr>
                {#each fakeHeader as _}
                <th class="placeholder-glow col-{colunmWidth}"><span class="placeholder col-8"></span></th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each fakeData as _}
                <tr class="placeholder-glow">
                    {#each fakeHeader as _}
                    <td>
                        <span class="placeholder col-6"></span>
                    </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .loading-cover {
        position:absolute;
        top: 0px;
        left: 0px;
        z-index: 10;
        background-color: white;
    }
</style>
