import Email from "./valueObjects/Email"
import Phone from "./valueObjects/Phone"

export default class User {
    readonly name: string
    readonly email: Email
    readonly phone: Phone
    readonly address: Array<string>
    

    constructor(name: string, email: string, phone: string, address: Array<string>) {
        this.name = name
        this.email = Email.create(email)
        this.phone = Phone.create(phone)
        this.address = address
    }
}