export default class Phone {
    readonly value: string;

    private constructor(value: string) {
        if (this.isInvalid(value)) {
            throw new Error('Invalid phone'); // add exception
        }

        this.value = value;
        Object.freeze(this);
    }

    static create(value: string): Phone {
        return new Phone(value);
    }

    private isInvalid(value: string): boolean {
        const brazilianPhoneRegex =
            /^(?:(?:\+55\s?)?(?:\([1-9][1-9]\)\s?)?|(?:\+55\s?)?(?:[1-9][1-9]\s?)?)?(?:9?[6789]\d{3}\-?\d{4})$/;
        return !brazilianPhoneRegex.test(value);
    }
}
