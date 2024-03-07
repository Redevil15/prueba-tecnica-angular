import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitadoAddEditComponent } from './invitado-add-edit.component';

describe('InvitadoAddEditComponent', () => {
  let component: InvitadoAddEditComponent;
  let fixture: ComponentFixture<InvitadoAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitadoAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitadoAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
