import { BasicComment, PostBase } from "../common";

export class Course extends PostBase {
    lessonIds: string[];
    leadTeacherId?: string;
    videoUrl?: string;
    constructor() {
        super();
        this.lessonIds = [];
        this.postType = 'course';
    }
}

export class Lesson extends PostBase {
    teacherIds: string[];
    videoUrl?: string;
    excerciseIds?: string[];
    comments?: Array<BasicComment> = [];

    constructor() {
        super();
        this.teacherIds = [];
        this.videoUrl = '';
        this.excerciseIds = [];
        this.comments = [];
        this.postType = 'lesson';
    }
}

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