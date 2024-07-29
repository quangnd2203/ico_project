export default interface Mapper<E, D> {
    toResponse(entity: E): D;

    toDomain(dto: D): E;
}