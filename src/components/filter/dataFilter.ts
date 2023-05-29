export interface FilterTag {
    id: string
    name: string
}

type TargetType = "string"|"number"
type ContainerType = "list"|"none"
interface FilterSpec {
    op: string
    container: ContainerType
    requiredValues: number
}

export interface FilterSchema {
    name: string
    target: string
    targetType: TargetType
    filterSpec: FilterSpec
    resolver: any
    toString: ((values: any)=>string)|undefined
}

export interface Filter {
    schema: FilterSchema
    values: any
}
