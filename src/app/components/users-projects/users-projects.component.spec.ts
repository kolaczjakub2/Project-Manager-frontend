import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersProjectsComponent } from './users-projects.component';

describe('UsersProjectsComponent', () => {
  let component: UsersProjectsComponent;
  let fixture: ComponentFixture<UsersProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
