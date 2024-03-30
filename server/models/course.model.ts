import mongoose, { Document, Model, Schema } from "mongoose";
import { IProfessor } from "./professor.model";

interface IExercise extends Document {
  question: string;
  answers: { answer: string }[];
  correctChoice: number;
}

interface IContent extends Document {
  id: string;
  type: string;
  url?: string;
  width?: number;
  height?: number;
  lineHeight?: number;
  indent?: number;
  lang?: string;
  checked?: boolean;
  listStart?: number;
  listStyleType?: string;
  children?: [
    {
      text: string;
      kbd?: boolean;
      type?: string;
      superscript?: boolean;
      subscript?: boolean;
      color?: string;
      backgroundColor?: string;
      highlight?: boolean;
      code?: boolean;
    }
  ];
  caption?: [{ text?: string }];
}

interface ICourseData extends Document {
  title: string;
  content: IContent[];
  exercise: IExercise[];
  coursePdf: {
    public_id: string;
    url: string;
  };
}

interface ICourseQuiz extends Document {
  quiz: [
    {
      question: string;
      answers: { answer: string }[];
      correctChoice: number;
    }
  ];
}

export interface ICourse extends Document {
  user: IProfessor;
  courseTitle: string;
  yearOfStudy: string;
  semester: number;
  price: number;
  subscribersNumber?: number;
  private: boolean;
  courseData: ICourseData[];
  quiz: ICourseQuiz[];
  coursePdf: object;
  pdfName?: string;
  purchased?: number;
}

const contentSchema = new Schema<IContent>({
  id: String,
  type: String,
  url: String,
  width: Number,
  height: Number,
  lineHeight: Number,
  indent: Number,
  lang: String,
  checked: Boolean,
  listStart: Number,
  listStyleType: String,
  children: [Object],
  caption: [Object],
});

const courseDataSchema = new Schema<ICourseData>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: [contentSchema],
  exercise: [
    {
      question: {
        type: String,
      },
      answers: [
        {
          answer: {
            type: String,
          },
        },
      ],
      correctChoice: {
        type: Number,
      },
    },
  ],
});

const courseQuizSchema = new Schema<ICourseQuiz>({
  quiz: [
    {
      question: {
        type: String,
      },
      answers: [
        {
          answer: {
            type: String,
          },
        },
      ],
      correctChoice: {
        type: Number,
      },
    },
  ],
});

const courseSchema = new Schema<ICourse>(
  {
    user: {
      type: Object,
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    yearOfStudy: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    subscribersNumber: {
      type: Number,
    },
    private: {
      type: Boolean,
      default: false,
    },
    courseData: [courseDataSchema],
    quiz: [courseQuizSchema],
    coursePdf: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    pdfName: {
      type: String,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const courseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

export default courseModel;
