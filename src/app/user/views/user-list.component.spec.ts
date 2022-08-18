import { LazyLoadEvent } from 'primeng/api';
import { of } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { User } from '../model/User';
import { UserPage } from '../model/UserPage';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {

  let userListComponent;
  let cdRef;
  let mockUserService;
  let mockConfirmationService;
  let mockMessageService;

  let USER_ITEM = [
    new User({id: 11, username: "angeherr", email: "angeherr@capgemini.com",first_name:"Angello", last_name: "Herrera"}),
    new User({id: 12, username: "olagoang", email: "olagoang@capgemini.com",first_name:"Oscar", last_name: "Lago"})
  ];

  let USER_ITEM_DELETED = [
    new User({id: 12, username: "olagoang", email: "olagoang@capgemini.com",first_name:"Oscar", last_name: "Lago"})
  ];

  beforeEach(()=>{
    mockUserService = jasmine.createSpyObj(["findPage", "deleteUserById"]);
    cdRef = jasmine.createSpyObj([""]);
    mockConfirmationService = jasmine.createSpyObj(["confirm","close"]);
    mockMessageService = jasmine.createSpyObj([""])

    userListComponent = new UserListComponent(cdRef,mockConfirmationService, mockUserService, mockMessageService);
  })

  it("findPageShouldReturnUserPage", ()=>{
    let pageable: Pageable = {
      pageNumber: 0,
      pageSize: 10,
      sort: [{
        property: 'username',
        direction: 'asc'
      }]
    }

    let event = {} as LazyLoadEvent;
    event = {first: 0, rows: 10}

    let userPage = new UserPage()
    userPage.content = USER_ITEM;
    userPage.pageable = pageable;

    mockUserService.findPage.and.returnValue(of(userPage));
    userListComponent.loadPage(event);

    expect(userListComponent.user).not.toEqual(null);
    expect(userListComponent.userPage.pageable.pageNumber).toEqual(userPage.pageable.pageNumber);
    expect(userListComponent.listOfData).toEqual(USER_ITEM);

  })

  it("deleteUserShouldDelete",()=>{
    let pageable: Pageable = {
      pageNumber: 0,
      pageSize: 10,
      sort: [{
        property: 'username',
        direction: 'asc'
      }]
    }

    let event = {} as LazyLoadEvent;
    event = {first: 0, rows: 10}

    let userPage = new UserPage()
    userPage.content = USER_ITEM_DELETED;
    userPage.pageable = pageable;
    
    mockUserService.findPage.and.returnValue(of(userPage))
    mockUserService.deleteUserById.and.returnValue(of(userListComponent.ngOnInit()))
    userListComponent.loadPage(event);
    userListComponent.deleteUser(USER_ITEM[0])
    expect(userListComponent.userPage.pageable.pageNumber).toEqual(userPage.pageable.pageNumber)
    expect(userListComponent.listOfData).toEqual(USER_ITEM_DELETED);
  })
});