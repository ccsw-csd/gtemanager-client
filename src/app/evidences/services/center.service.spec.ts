/**
 * Tests para CenterService.
 */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CenterService } from './center.service';

describe('CenterService', () => {
  let service: CenterService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CenterService);
    http = TestBed.inject(HttpTestingController);
  });

  /**
   * Servicio debería crearse.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
