import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ErrorListComponent } from './error-list.component';

describe('ErrorListComponent', () => {
  let errorListComponent: ErrorListComponent;
  let mockErrorService;

  let DATA_LIST = [
    {id:1, name:null, saga:null, email:null, period:null, message:null},
    {id:2, name:null, saga:null, email:null, period:null, message:null},
    {id:3, name:null, saga:null, email:null, period:null, message:null}
  ]

  beforeEach(() => {
    mockErrorService = jasmine.createSpyObj(["findAll"]);
    errorListComponent = new ErrorListComponent(mockErrorService);
  });

  it('findAllShouldReturnErrors', () => {
    mockErrorService.findAll.and.returnValue(of(DATA_LIST));
    
    errorListComponent.findAll();

    expect(errorListComponent.errors).toEqual(DATA_LIST);
  });
});
