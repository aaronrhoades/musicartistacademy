import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/models/blog/post';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: Post[] = new Array<Post>();

  constructor() { }

  ngOnInit(): void {
  }

}
