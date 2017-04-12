import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourDecksComponent } from './your-decks.component';

describe('YourDecksComponent', () => {
  let component: YourDecksComponent;
  let fixture: ComponentFixture<YourDecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourDecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
