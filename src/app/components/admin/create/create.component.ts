import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project'; 
import { ProjectService } from '../../../services/project.service';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';
import { Global } from '../../../services/global'; 


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit{

  public title: String;
  public project: Project;
  faFolderOpen = faFolderOpen;
  public status: String= '';
  public filesToUpload!: Array<File>; 

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) { 
    this.title= 'Create Project';
    this.project = new Project('','','','','','','','')
  }

  
  ngOnInit(): void {
  }

  onSubmit(form: any){
    console.log(this.project);
    this._projectService.saveProject(this.project).subscribe(
      response =>{
        if(response.project){
            this.status = 'success';

             //upload images
            this._uploadService.makeFileRequest(Global.url+"/uploadImage/"+response.project._id, 
            [], this.filesToUpload, 'image')
            .then((result:any)=>{
              console.log(result);
            })

            form.reset(); 
        }else{
            this.status = 'failed';
        }
      } 
    );
  }

  fileChangeEvent(fileInput: any){
   this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  showModalSwal2Error(): void{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
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
