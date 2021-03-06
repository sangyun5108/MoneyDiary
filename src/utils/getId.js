export const getId = (type,value) => {
    let id = value;
    try {
        const lists = JSON.parse(localStorage.getItem('lists'))
        .filter((list)=> list.type===type)

        if(lists.length!==0){
            id = ++lists[lists.length-1].id;
        }
    } catch (err){
        localStorage.clear();
        console.log(err.name);
    }
    return id;
} 