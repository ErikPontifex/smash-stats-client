import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadToHeadTableComponent } from './head-to-head-table.component';

describe('HeadToHeadTableComponent', () => {
  let component: HeadToHeadTableComponent;
  let fixture: ComponentFixture<HeadToHeadTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadToHeadTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadToHeadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
