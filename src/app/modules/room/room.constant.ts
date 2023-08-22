
export const roomFilterableFields = ['searchTerm', 'id', 'buildingId'];
export const roomSearchableFields = ['roomNumber', 'floor'];



export const roomRelationalFields = ['buildingId'];
export const roomRelationalFieldsMapper:{[key:string]:string} = {
    ['buildingId']: 'building'
}

