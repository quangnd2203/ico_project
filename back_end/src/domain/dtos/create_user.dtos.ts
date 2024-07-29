export default class CreateUserDto {
    id: String;
    name: String;

    constructor(id: String, name: String) {
        this.id = id;
        this.name = name;
    }
}