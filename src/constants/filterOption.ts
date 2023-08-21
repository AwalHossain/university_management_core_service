/* eslint-disable @typescript-eslint/no-explicit-any */



const searchFilter = (
    searchTerm: string | undefined,
    searchableFields: string[],
)=>{

     const andCondition = ({
            OR: searchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });

    return andCondition
}



const objectFilter = (filterOption: any, relationalFields: any, relationalFieldMapper: any) => {
 const result =   Object.keys(filterOption).map((key) => {
        if(relationalFields.includes(key)){
            return{
                [relationalFieldMapper[key]]: {
                    id: (filterOption as any) [key]
                }
            }
        }else{
            return{
                [key]: {
                    equals: (filterOption as any)[key]
                }
            }
        }
    })

    return result;
    
}


export const FilterOption ={
    searchFilter,
    objectFilter
} 