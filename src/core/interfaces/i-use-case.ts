/**
 * Use this interface to declare a use case
 */
export default interface IUseCase<T, U> {
    /**
     * Performs the business logic of the use case
     * @param requestModel The request model to be sued on the use case (beforehand defined)
     * @returns Given second type
     */
    perform(requestModel: T): Promise<U>;
}
