import User from '../domain/User'

test('Deve criar um usuário válido', () => {
    // Fake data
    const { name, email, phone, address } = {
        name: 'Gabriel Reis',
        email: 'gabriel@teste.com',
        phone: '79999990000',
        address: ['1', '0'],
    }

    const user = new User(name, email, phone, address)

    expect(user.name).toBe(name)

    // Email is defined ?
    expect(user.email).toBeDefined()
    expect(user.email.value).toBe(email)

    // Phone is defined ?
    expect(user.phone).toBeDefined()
    expect(user.phone.value).toBe(phone)

    expect(user.address).toEqual(address)
})
