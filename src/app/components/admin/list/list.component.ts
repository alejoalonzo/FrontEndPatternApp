import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { Global } from '../../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ProjectService]
})
export class ListComponent implements OnInit{
  public pro: Project[] = [];
  public url: String;
  public changeClass:boolean;

  constructor(
    private _projectService: ProjectService
  ) {
    this.url= Global.url;
    this.changeClass =false;
   }

   ngOnInit(): void {
    this.getProject();
  }

  getProject(){
    this._projectService.getProject().subscribe(
      response=>{
        if(response.projects){
          this.pro = response.projects;
        }
        
      }
    )
  }

  deleteProject(id: any) {
    this.confirmationDelete().then((result) => {
      if (result.isConfirmed) {
        this._projectService.deleteProject(id).subscribe(
          (response) => {
            // Manejar la respuesta exitosa aquí
            console.log('Proyecto eliminado:', response);
            Swal.fire("Project deleted!", "", "success");
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Deletion cancelled", "", "info");
      }
    });
  }
  
  confirmationDelete() {
    return Swal.fire({
      title: "Are you sure you want to delete the project?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      icon: "warning",
    });
  }
  

}
