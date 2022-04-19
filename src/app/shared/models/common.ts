export class PostBase {
    id: string;
    title: string;
    description: HTMLCollection;
    body: HTMLCollection;
    postType: string;

    constructor() {
        this.id = '';
        this.title = '';
        this.description = new HTMLCollection();
        this.body = new HTMLCollection();
        this.postType = '';
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