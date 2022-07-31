import { BasicComment, PostBase } from "../common";

export class Course {
    _id?: string;
    title: string = '';
    body: string = '';
    description: string = '';
    featureImageUrl?: string;
    videoUrl?: string;
    modules: [{
        title: string;
        description: string;
        videoUrl: string;
        lessonIds: string[];
    }?] = [];
}

export class Lesson {
    _id?: string;
    title:string = '';
    description: string = '';
    teacherIds: string[] = [];
    body: string = '';
    featureImageUrl?: string = '';
    videoUrl?: string ='';
    homework?: string = '';
    exercise?: string = '';
}

// export class Lesson extends PostBase {
//     teacherIds: string[];
//     videoUrl?: string;
//     excerciseIds?: string[];
//     comments?: Array<BasicComment> = [];

//     constructor() {
//         super();
//         this.teacherIds = [];
//         this.videoUrl = '';
//         this.excerciseIds = [];
//         this.comments = [];
//         this.postType = 'lesson';
//     }
// }

export class Exercise extends PostBase {    
    attachments: FileList;
    
    constructor() {
        super();
        this.attachments = new FileList();
    }
}

export interface Question {
    question: string;
    answer: string;
}

export class MultipleChoiceQuestion implements Question {
    question: string;
    answer: string;
    falseAnswers: string[];

    constructor(){
        this.question = '';
        this.answer = '';
        this.falseAnswers = [];
    }
}