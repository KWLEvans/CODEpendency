import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTileComponent } from './question-tile.component';

describe('QuestionTileComponent', () => {
  let component: QuestionTileComponent;
  let fixture: ComponentFixture<QuestionTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
