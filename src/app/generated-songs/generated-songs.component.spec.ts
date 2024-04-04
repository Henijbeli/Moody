import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedSongsComponent } from './generated-songs.component';

describe('GeneratedSongsComponent', () => {
  let component: GeneratedSongsComponent;
  let fixture: ComponentFixture<GeneratedSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratedSongsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneratedSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
