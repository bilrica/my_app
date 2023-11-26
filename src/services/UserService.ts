import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import User from "../interfaces/User";
import UserRepository from "../repositories/UserRepository";

class UserService {
    constructor(private userRepository: UserRepository) { }

    createUser(name: string, email: string, password: string): User {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user: User = {
            id: uuidv4(),
            name,
            email,
            password: hashedPassword,
        };
        return this.userRepository.create(user);
    }

    getUserById(id: string): User | null {
        return this.userRepository.findById(id);
    }

    getUserByEmail(email: string): User | null {
        return this.userRepository.findByEmail(email);
    }

    updateUser(user: User): User | null {
        return this.userRepository.update(user);
    }

    deleteUser(id: string): void {
        this.userRepository.delete(id);
    }

    getAllUsers(): User[] {
        return this.userRepository.getAllUsers();
    }
}

export default UserService;
