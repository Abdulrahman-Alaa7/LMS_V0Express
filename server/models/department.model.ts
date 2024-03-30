import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const emialRegexpattern: RegExp =
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export interface IDepartment extends Document {
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
  facultyName: string;
  userCreatedById: object;
  semester: number;
  yearsOfStudy: number;
  professors: Array<{ professorId: string }>;
  yearOne: {
    yearId: ObjectId;
    students: Array<{ studentId: string }>;
  };
  yearTwo: {
    yearId: ObjectId;
    students: Array<{ studentId: string }>;
  };
  yearThree: {
    yearId: ObjectId;
    students: Array<{ studentId: string }>;
  };
  yearFour: {
    yearId: ObjectId;
    students: Array<{ studentId: string }>;
  };
  yearFive: {
    yearId: ObjectId;
    students: Array<{ studentId: string }>;
  };
  yearSix: {
    yearId: ObjectId;
    students: Array<{ studentId: string }>;
  };
  yearSeven: {
    yearId: ObjectId;
    students: Array<{ studentId: string }>;
  };
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const departmentSchema: Schema<IDepartment> = new mongoose.Schema(
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
      default: "department",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    universityName: {
      type: String,
      required: true,
    },
    facultyName: {
      type: String,
      required: true,
    },
    userCreatedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    semester: {
      type: Number,
      default: 1,
    },
    yearsOfStudy: {
      type: Number,
      required: true,
    },
    professors: [
      {
        professorId: String,
      },
    ],
    yearOne: {
      yearId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      students: [
        {
          studentId: String,
        },
      ],
    },
    yearTwo: {
      yearId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      students: [
        {
          studentId: String,
        },
      ],
    },
    yearThree: {
      yearId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      students: [
        {
          studentId: String,
        },
      ],
    },
    yearFour: {
      yearId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      students: [
        {
          studentId: String,
        },
      ],
    },
    yearFive: {
      yearId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      students: [
        {
          studentId: String,
        },
      ],
    },
    yearSix: {
      yearId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      students: [
        {
          studentId: String,
        },
      ],
    },
    yearSeven: {
      yearId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      students: [
        {
          studentId: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
departmentSchema.pre<IDepartment>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Sign access token
departmentSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

// Sign refresh token
departmentSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "5d",
  });
};

// Compare password
departmentSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export Faculty Schema
const departmentModel: Model<IDepartment> = mongoose.model(
  "Department",
  departmentSchema
);
export default departmentModel;
