import Phone from '../domain/valueObjects/Phone';

test('Deve criar um telefone válido e retornar o value do telefone criado', () => {
    const validNumbers = [
        '+55 (11) 98765-4321',
        '+55 (11) 8765-4321',
        '+55 11 98765-4321',
        '+55 11 8765-4321',
        '+55 11 987654321',
        '+55 11 87654321',
        '11 987654321',
        '11 98765-4321',
        '11 87654321',
        '11 8765-4321',
        '(11) 98765-4321',
        '(11) 8765-4321',
        '11987654321',
        '1187654321',
        '118765-4321',
        '+55 (21) 98765-4321',
        '+55 (21) 8765-4321',
        '+55 (21) 987654321',
        '+55 (21) 87654321',
        '+55 21 98765-4321',
        '+55 21 8765-4321',
        '+55 21 987654321',
        '+55 21 87654321',
        '(21) 98765-4321',
        '(21) 87654321',
        '(21) 8765-4321',
        '21 8765-4321',
        '(21) 987654321',
        '21 87654321',
        '21 98765-4321',
        '21 987654321',
    ];

    validNumbers.forEach((number) => {
        const inst = Phone.create(number);
        return expect(inst.value).toBe(number);
    });
});
