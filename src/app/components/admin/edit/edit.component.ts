import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project'; 
import { ProjectService } from '../../../services/project.service';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';
import { Global } from '../../../services/global'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['../create/create.component.scss'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit{

  public title: String;
  public project!: Project;
  faFolderOpen = faFolderOpen;
  public status: String= '';
  public filesToUpload!: Array<File>; 

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
  ){  this.title= 'Edit project';}

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id = params['id'];
      this.getProject(id);
    })
  }

  getProject(id:any){
    this._projectService.getProjectOne(id).subscribe(response=>{
      this.project = response.project;
    })
  }

  onSubmit(form: any){
    //console.log(this.project);
    this._projectService.setProject(this.project).subscribe(
      response =>{
         if(response.project){
             this.status = 'success';

             //Subir las imagenes
             this._uploadService.makeFileRequest(Global.url+"/uploadImage/"+response.project._id, 
             [], this.filesToUpload, 'image')
             .then((result:any)=>{
               console.log(result);
             })

             //form.reset(); 
         }else{
             this.status = 'failed';
         }
      } 
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
   }

   showModalSwal2success(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
