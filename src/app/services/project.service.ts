import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { Project } from "../models/project";
import { Global } from "./global";
import { Contact } from "../models/contact";


@Injectable()
export class ProjectService{
    public url: String;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    saveContact (contact: Contact): Observable<any>{
        let params = JSON.stringify(contact);
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.post(this.url+'/sent-email',params , {headers:headers});

    }

    saveProject (project: Project): Observable<any>{
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.post(this.url+'/save-project',params , {headers:headers});

    }

    getProject(): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url+'/projects',{headers:headers});
    }

    getProjectOne(id:any): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url+'/project/'+id,{headers:headers});
    }
    deleteProject(id:any): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.delete(this.url+'/project/'+id,{headers:headers});
    }
    setProject(project:any): Observable<any>{
        let params = JSON.stringify(project)

        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.put(this.url+'/project/'+project._id, params, {headers:headers});
    }
}
