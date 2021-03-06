import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostTitleComponent } from './post-title.component';

describe('PostTileComponent', () => {
  let component: PostTitleComponent;
  let fixture: ComponentFixture<PostTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
