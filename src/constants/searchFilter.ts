


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

export default searchFilter;