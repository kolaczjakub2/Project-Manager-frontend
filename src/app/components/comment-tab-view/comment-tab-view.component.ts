import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TaskService} from '../../services/task.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comment-tab-view',
  templateUrl: './comment-tab-view.component.html',
  styleUrls: ['./comment-tab-view.component.css']
})
export class CommentTabViewComponent implements OnInit, OnDestroy {
  comments;
  commentFormGroup: FormGroup;
  @Input() taskKey: string;
  @Input() users = [];

  @Input() events: Observable<void>;
  @ViewChild('commentTextArea') commentTextArea: ElementRef;
  private eventsSubscription: Subscription;

  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute,
              private taskService: TaskService) {
    this.commentFormGroup = this.fb.group(({
      content: [''],
      creatorId: ['']
    }));


  }

  focusComment() {
    this.commentTextArea.nativeElement.focus();
  }


  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.getComments(routeParams.id);
    });
    this.eventsSubscription = this.events.subscribe(() => this.focusComment());
    this.getComments(this.taskKey);
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }


  private getComments(key) {
    this.taskService.getComments(key).subscribe(comments => this.comments = comments);
  }

  commentSubmit() {
    this.commentFormGroup.get('creatorId').setValue(localStorage.getItem('userId'));
    this.taskService.addComment(this.commentFormGroup.value, this.taskKey).subscribe(() => {
      this.commentFormGroup.get('content').reset();
      this.getComments(this.taskKey);
    });
  }

  commentUpdate($event: any) {
    this.taskService.updateComment($event, this.taskKey).subscribe(() => this.getComments(this.taskKey));
  }
}
