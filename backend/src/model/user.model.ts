import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";


export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  tz: string;
  city: string;
  street: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    tz: { type: String, required: true, unique: true },
    city: { type: String },
    street: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Role, default: Role.USER },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  return next();
});

// Used for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
