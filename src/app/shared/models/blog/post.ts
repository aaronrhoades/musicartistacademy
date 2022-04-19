export class Post {
    title: string;
    body: HTMLCollection = new HTMLCollection();
    postType: string;

    constructor() { 
        this.title = '';
        this.body = new HTMLCollection();
        this.postType = '';
    }
}