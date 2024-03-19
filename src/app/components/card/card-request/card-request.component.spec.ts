import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; 
import { CardRequestComponent } from './card-request.component';

describe('CardRequestComponent', () => {
  let component: CardRequestComponent;
  let fixture: ComponentFixture<CardRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRequestComponent,FormsModule]

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
