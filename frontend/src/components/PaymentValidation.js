function PaymentValidation(values){
    let error = {}
    const Visa_pattern = /^\d{16}$/
    const name_pattern = /^[a-zA-Z]+ [a-zA-Z]+$/
    const cvv_pattern = /^\d{3}$/
    const currentTime = new Date();
    const currentYear = currentTime.getFullYear();
    const currentMonth = currentTime.getMonth() + 1;

    if(values.cardNumber === ""){
        error.cardNumber = "Visa number required"
    } else if(!Visa_pattern.test(values.cardNumber)) {
        error.cardNumber = "Please enter a valid 16 digit Visa number"
    } else {
        error.cardNumber = ""
    }

    if(values.cardholderName === ""){
        error.cardholderName = "Full name required"
    } else if(!name_pattern.test(values.cardholderName)) {
        error.cardholderName = "Please enter first and last name"
    } else {
        error.cardholderName = ""
    }

    if(values.cvv === ""){
        error.cvv = "CVV required"
    } else if(!cvv_pattern.test(values.cvv)) {
        error.cvv = "Please enter a 3-digit CVV"
    } else {
        error.cvv = ""
    }

    if(values.expiryYear < currentYear) {
        error.expiryYear = "Card Expired"
    } else if(values.expiryYear === currentYear && values.expiryMonth < currentMonth) {
        error.expiryMonth = "Card Expired"
    } else {
        error.expiryMonth = ""
        error.expiryYear = ""
    }


    return error

}

export default PaymentValidation;