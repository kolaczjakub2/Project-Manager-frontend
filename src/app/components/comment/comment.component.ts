import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment;
  @Input() users;
  @Output() commentUpdate = new EventEmitter();

  contentMode = 'LABEL';
  commentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      content: ['']
    });
  }

  ngOnInit(): void {
    this.commentForm.patchValue(this.comment);
  }

  getCommentCreator(userId: any) {
    let user = this.users.filter(user => user.id === userId);
    return user[0].firstName + ' ' + user[0].lastName;
  }

  onEditMode() {
    this.contentMode = 'TEXTAREA';
  }

  getCreatedDate(date) {
    return new Date(date).toLocaleString();
  }

  onBlur() {

  }

  onSubmit() {
    this.contentMode = 'LABEL';
    this.commentUpdate.emit({
      content: this.commentForm.get('content').value,
      commentId: this.comment.id
    });
  }
}
