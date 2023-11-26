import UserController from "./controllers/UserController";
import { Router } from "express";
const userController = new UserController();

const router = Router();
router.get('/server', (req, res) => res.sendFile(__dirname + "/teste.html")
    ,);
router.post("/users", (req, res) => userController.createUser(req, res));
router.get("/users/:id", (req, res) => userController.getUserById(req, res));
router.put("/users/:id", (req, res) => userController.updateUser(req, res));
router.get("/users", (req, res) => userController.getAllUsers(req, res));
router.delete("/users/:id", (req, res) => userController.deleteUser(req, res));
module.exports = router;