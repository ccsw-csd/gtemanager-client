import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LazyLoadEvent } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { Person } from 'src/app/person/model/Person';
import { User } from '../../model/User';
import { UserPage } from '../../model/UserPage';

import { UserEditComponent } from './user-edit.component';

describe('UserEditComponent', () => {

  let userEditComponent;
  let cdRef;
  let mockUserService;
  let mockDynamicDialogConfigService;
  let mockSnackbarService;
  let mockPersonService;

  let PERSON_ITEM = [
    new Person({id: 11,saga: null ,username: "angeherr", email: "angeherr@capgemini.com",name:"Angello", lastName: "Herrera"}),
    new Person({id: 12,saga: null , username: "olagoang", email: "olagoang@capgemini.com",name:"Oscar", lastName: "Lago"})
  ];

  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockUserService = jasmine.createSpyObj(["findPage", "deleteUserById", "saveUser"]);
    mockDynamicDialogConfigService = jasmine.createSpyObj(["confirm","close"]);
    cdRef = jasmine.createSpyObj(["close"]);
    mockSnackbarService = jasmine.createSpyObj(["error","showMessage"])
    mockPersonService = jasmine.createSpyObj(["findPersonsByFilter"])

    userEditComponent = new UserEditComponent(cdRef,mockDynamicDialogConfigService, mockUserService, mockSnackbarService, mockPersonService);

  });

  it('saveShouldSaveIfArgumentsAreCorrect', () =>{
    let newElement = new User({id: 13, username: "olagoang2", email: "olagoang2@capgemini.com",firstName:"Oscar2", lastName: "Lago2"})

    mockUserService.saveUser.and.returnValue(of(true))
    userEditComponent.onSave(newElement)
    expect(userEditComponent.onSave(newElement)).not.toEqual(null)
  })

  it('saveShouldSaveIfEmailOrUsernameAlreadyExists', () =>{
    let newElement = new User({id: 13, username: "olagoang2", email: "olagoang2@capgemini.com",firstName:"Oscar2", lastName: "Lago2"})
    let errorResponse = new HttpErrorResponse({ status: 409, error: {}});

    mockUserService.saveUser.and.returnValue(throwError(() => errorResponse))
    userEditComponent.onSave(newElement)
    expect(userEditComponent.onSave(newElement)).not.toEqual(null)
  })

  it('findPersonWithFilterShouldReturnListOfPersons', () =>{
    let filter = {originalEvent: InputEvent, query: 'an'}

    mockPersonService.findPersonsByFilter.and.returnValue(of(PERSON_ITEM))
    userEditComponent.filterPossiblePersons(filter)
    
    expect(userEditComponent.filteredPersons).toEqual(PERSON_ITEM)
  })
  
});
