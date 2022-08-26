import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Person } from 'src/app/person/model/Person';
import { PersonService } from 'src/app/person/services/person.service';
import { User } from '../../model/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user : User
  filter : String
  personas: Person[]
  selectedPerson: Person;
  filteredPersons: any[];
  description: String;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private userService: UserService, 
    private snackbarService: SnackbarService,
    private personService: PersonService,
    
  ) { }

  ngOnInit(): void {
      this.user = new User();
  }

  onSave(user: User) {
      this.userService.saveUser(user).subscribe({
        next: ()=> {
          this.snackbarService.showMessage('El registro se ha guardado con éxito')
          this.ref.close();
        }, 
        error: ()=>{
          this.snackbarService.error('Ya existe un usuario con el mismo email y/o nombre de usuario. No se pudo guardar')
        }
      })
  }
  
  onClose() {
    this.ref.close();
  }

  filterPossiblePersons(event){
      this.personService.findPersonsByFilter(event.query).subscribe({
      next: (res: Person[])=> {
        this.filteredPersons = res
        res.forEach(person => { person.description = person.name + " " + 
                                person.lastName + "  (" + person.username +")"
                              } );  
      }, 
      error: ()=>{
        this.snackbarService.error('Error: no se encuentra ninguna persona'); 
      }
    })
  }

  selectPerson(){
    this.selectedPerson==this.filteredPersons[0]
    if(this.selectedPerson!=null){
        this.user.email=this.selectedPerson.email
        this.user.firstName=this.selectedPerson.name
        this.user.lastName=this.selectedPerson.lastName
        this.user.username=this.selectedPerson.username
    }
  }

}