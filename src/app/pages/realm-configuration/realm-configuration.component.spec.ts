import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmConfigurationComponent } from './realm-configuration.component';

describe('RealmConfigurationComponent', () => {
  let component: RealmConfigurationComponent;
  let fixture: ComponentFixture<RealmConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealmConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealmConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
