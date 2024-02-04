export default interface UseCase<I, O> {
    exec(input: I): Promise<O>
}