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



const objectFilter = (filterOption: any, relationalFields: string[], relationalFieldMapper: {[key:string]:string}) => {
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

const filterCondition = (filterData: any)=>{
    const result = Object.keys(filterData).map((key) => (
        {
            [key]: {
                equals: (filterData as any) [key]
            }

        }

    ))
    return result;
}



export const FilterOption ={
    searchFilter,
    objectFilter,
    filterCondition
} 