
const firstLettersOfName=(fullName:string|undefined)=>{
    return fullName?.trim().split(/\s+/).map(name => name[0]).join("")
}

export default firstLettersOfName