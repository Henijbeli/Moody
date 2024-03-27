import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistPlaceComponent } from './artist-place.component';

describe('ArtistPlaceComponent', () => {
  let component: ArtistPlaceComponent;
  let fixture: ComponentFixture<ArtistPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistPlaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
