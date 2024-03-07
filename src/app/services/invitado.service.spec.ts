import { TestBed } from '@angular/core/testing';

import { InvitadoService } from './invitado.service';

describe('InvitadoService', () => {
  let service: InvitadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
