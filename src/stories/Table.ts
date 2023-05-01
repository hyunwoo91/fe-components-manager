export async function generatePromiseData(size: number, header: string[]): Promise<any[]> {
    const data = generateData(size, header)
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), 3000)
    })
}
function generateData(size: number, header: string[]) : any[] {
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