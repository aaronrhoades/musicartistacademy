export class PostBase {
    id: string;
    title: string;
    description: string;
    body: string;
    postType?: string;
    featureImageUrl: string;

    constructor() {
        this.id = '';
        this.title = '';
        this.description = '';
        this.body = '';
        this.postType = '';
        this.featureImageUrl = '';
    }    
}

export class BasicComment {
    id: string;
    postId?: string;
    body: string;

    constructor(){
        this.id = '';
        this.body = '';
    }
}

export class FAQ {
    id: string;
    question: string;
    answer: HTMLCollection;

constructor(){
    this.id = '';
    this.question = '';
    this.answer = new HTMLCollection;
}
}