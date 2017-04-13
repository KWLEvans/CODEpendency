import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckTileComponent } from './deck-tile.component';

describe('DeckTileComponent', () => {
  let component: DeckTileComponent;
  let fixture: ComponentFixture<DeckTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
