import Email from "../domain/valueObjects/Email"

test("Deve criar um email válido e retornar o value do email criado", () => {
    const input = "gabriel@hotmail.com"
    const email = Email.create(input)

    expect(email.value).toBe(input)
})