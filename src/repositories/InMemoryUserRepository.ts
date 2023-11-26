import User from "../interfaces/User";
import UserRepository from "./UserRepository";


class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];

    create(user: User): User {
        this.users.push(user);
        return user;
    }

    findById(id: string): User | null {
        return this.users.find((user) => user.id === id) || null;
    }

    findByEmail(email: string): User | null {
        return this.users.find((user) => user.email === email) || null;
    }

    update(user: User): User | null {
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
            return user;
        }
        return null;
    }

    delete(id: string): void {
        this.users = this.users.filter((user) => user.id !== id);
    }

    getAllUsers(): User[] {
        return this.users;
    }
}

export default InMemoryUserRepository;
