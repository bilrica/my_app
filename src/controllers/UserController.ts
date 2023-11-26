import { Request, Response } from "express";
import UserService from "../services/UserService";
import InMemoryUserRepository from "../repositories/InMemoryUserRepository";
import bcrypt from "bcrypt";

const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);

class UserController {
    createUser(req: Request, res: Response): void {
        const { name, email, password } = req.body;
        const user = userService.createUser(name, email, password);
        res.status(201).json(user);
    }

    getUserById(req: Request, res: Response): void {
        const { id } = req.params;
        const user = userService.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    }

    updateUser(req: Request, res: Response): void {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const existingUser = userService.getUserById(id);

        if (existingUser) {
            const updatedUser = userService.updateUser({
                id,
                name,
                email,
                password: bcrypt.hashSync(password, 10),
            });

            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    }

    deleteUser(req: Request, res: Response): void {
        const { id } = req.params;
        const user = userService.getUserById(id);

        if (user) {
            userService.deleteUser(id);
            res.json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    }
    getAllUsers(req: Request, res: Response): void {
        const users = userService.getAllUsers();
        res.json(users);
    }
}

export default UserController;
