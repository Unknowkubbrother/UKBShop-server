import mongoose from "mongoose";
import Roles from "../enum/roles";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: {type: String, required: true, unique: true},
    role: { type: String, enum: Object.values(Roles), required: true, default: Roles.USER},
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});

export const User = mongoose.model('User', UserSchema);


export const getUsers = () => User.find();
export const getUserById = (id: string) => User.findById(id);
export const getUserByUsername = (username: string) => User.findOne({ username });
export const createUser = (values: Record<string, any>) => new User(values)
    .save().then((user) => user.toObject());
export const getUserBySessionToken = (sessionToken: string) => User.findOne({
    'authentication.sessionToken': sessionToken
});