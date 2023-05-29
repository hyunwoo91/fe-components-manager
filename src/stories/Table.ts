import type { HeadItem } from "../components/table/table"

export function generateData(size: number, header: string[]) : any[] {
    const data = []
    for(let i = 0; i < size; i++) {
        const item: any = {}
        for(const [j, col] of header.entries()) {
            item[col] = `prop-${j}`
        }
        data.push(item)
    }
    return data
}

export function generateHeader(columnCount: number) : HeadItem[] {
    const header = []
    for (let i = 0; i < columnCount; i++) {
        header.push({
            title: `col ${i}`,
            dataAccessor: `col-${i}`
        })
    }
    return header
}
