import { generateData } from "./table"

export async function generatePromiseData(size: number, header: string[]): Promise<any[]> {
    const data = generateData(size, header)
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), 3000)
    })
}
