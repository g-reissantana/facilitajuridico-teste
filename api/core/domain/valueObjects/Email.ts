export default class Email {
    readonly value: string;

    private constructor(value: string) {
        if (this.isInvalid(value)) {
            throw new Error('Invalid email'); // add exception
        }

        this.value = value;
        Object.freeze(this);
    }

    static create(value: string): Email {
        return new Email(value);
    }

    private isInvalid(value: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value);
    }
}
