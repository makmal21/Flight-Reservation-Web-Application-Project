
function Validation(values){
    let error = {}
    const password_pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&^)(])[A-Za-z\d@$!%*?&^)(]{7,}$/
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if(values.email === ""){
        error.email = "Email should not be empty"
    } else if(!email_pattern.test(values.email)) {
        error.email = "Invalid email"
    } else {
        error.email = ""
    }

    if(values.firstName === ""){
        error.firstName = "First name should not be empty"
    } else {
        error.firstName = ""
    }

    if(values.lastName === ""){
        error.lastName = "Last name should not be empty"
    } else {
        error.lastName = ""
    }

    if(values.password === "") {
        error.password = "Password cannot be empty"
    } else if(!password_pattern.test(values.password)) {
        error.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, a special char and one digit"
    } else {
        error.password = ""
    }
    return error
}

export default Validation;