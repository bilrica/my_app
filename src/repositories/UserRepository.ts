import User from "../interfaces/User";

interface UserRepository {
    create(user: User): User;
    findById(id: string): User | null;
    findByEmail(email: string): User | null;
    update(user: User): User | null;
    delete(id: string): void;
    getAllUsers(): User[];
}

export default UserRepository;
