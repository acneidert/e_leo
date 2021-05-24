export function paginate(pagination){
    if(pagination === null) return {offset:0 , limit:20}
    const {page, pageSize} = pagination
    const offset = (page-1) * pageSize;
    const limit = pageSize
    return {
        offset,
        limit,
    }
}