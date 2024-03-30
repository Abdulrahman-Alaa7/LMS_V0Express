import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const emialRegexpattern: RegExp =
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export interface IFaculty extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  universityName: string;
  userCreatedById: object;
  departments: Array<{ departmentId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const facultySchema: Schema<IFaculty> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "please enter an email"],
      validate: {
        validator: function (value: string) {
          return emialRegexpattern.test(value);
        },
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"], // Delete this if you will use Social Auth like gmail or like this //
      minlength: [8, "password must be at least 8 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "faculty",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    universityName: {
      type: String,
      required: true,
    },
    userCreatedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
    departments: [
      {
        departmentId: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
facultySchema.pre<IFaculty>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Sign access token
facultySchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

// Sign refresh token
facultySchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "5d",
  });
};

// Compare password
facultySchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export Faculty Schema
const facultyModel: Model<IFaculty> = mongoose.model("Faculty", facultySchema);
export default facultyModel;
