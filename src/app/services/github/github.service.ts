import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from '../../../environments/environment';

import {catchError, retry, map} from "rxjs/operators";
import {Observable, throwError, of} from "rxjs";


const envPlatforms = environment.platforms;

const envCategories = environment.categories;

import jsonPlatforms from "src/assets/github-data/repository/IoT-AppZone-SampleApps/platforms.json";
import jsonRepositories from "src/assets/github-data/repository/repositories.json";
import jsonCategories
  from "src/assets/github-data/repository/IoT-AppZone-SampleApps/ME910C1-ML865C1-NE910C1/categories.json";
import jsonProjects
  from "src/assets/github-data/repository/IoT-AppZone-SampleApps/ME910C1-ML865C1-NE910C1/AppZoneSampleApps-AUX_UART/projects.json"

// import * as fs from "fs";


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  errorMsg: string = "";

  constructor(private httpClient: HttpClient) {

  }

  getJsonPlatform(path: any): any {
    // TODO for now only for IoT-AppZone-SampleApps repositories

    return new Promise((resolve, reject) => {
      if (jsonPlatforms) {
        resolve(jsonPlatforms);
      } else {
        reject();
      }
    });
  }

  getMetadata(repository: any, platform: any, category: any, project: any, metadata: any): Promise<any> {
    //console.log(metadata);
    return new Promise((resolve, reject) => {
      return import(`../../../assets/github-data/repository/${repository.name}/${platform.dir}/${category.name}/${project.name}/${metadata.name}`).then((files: any) => {
        if (files.default) {
          resolve(files.default);
        } else {
          reject();
        }
      }, (error: any) => {
        console.log(`${error}: ${repository.name} - ${platform.dir} - ${category.name} - ${project.name}`);
        reject();
      });
    });
  }

  getContent(repository: any, platform: any, category: any, project: any): Promise<any> {
    return new Promise((resolve, reject) => {
      return import(`../../../assets/github-data/repository/${repository.name}/${platform.dir}/${category.name}/${project.name}/list.json`).then((files: any) => {
        if (files.default) {
          resolve(files.default);
        } else {
          reject();
        }
      }, (error: any) => {
        console.log(`${error}: ${repository.name} - ${platform.dir} - ${category.name} - ${project.name}`);
        reject();
      });
    });
  }

  getApplication(repository: any, platform: any, category: any): any {
    // TODO for now only for IoT-AppZone-SampleApps/ME910C1-ML865C1-NE910C1/
    return new Promise((resolve, reject) => {
      return import(`../../../assets/github-data/repository/${repository.name}/${platform.dir}/${category.name}/projects.json`).then((proj: any) => {
        let p = proj.default.filter(function (item: any) {
          return item.type === 'dir';
        });
        if (p) {
          resolve(p);
        } else {
          console.log(`No dir found in assets/github-data/repository/${repository.name}/${platform.dir}/${category.name}/projects.json`);
          reject();
        }
      }, (error: any) => {
        console.log(`Error fetching assets/github-data/repository/${repository.name}/${platform.dir}/${category.name}/projects.json`);
        //console.log(`${error}: ${repository.name} - ${platform.dir} - ${category.name}`);
        reject();
      });
    });

  }

  getRemainingRateLimit(): any {
    return this.httpClient.get<any>(`https://api.github.com/`, {observe: 'response'})
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCategoriesByPlatform(repository: any, platform: any): any {
    // TODO for now only for IoT-AppZone-SampleApps/ME910C1-ML865C1-NE910C1/
    return new Promise((resolve, reject) => {
      return import(`../../../assets/github-data/repository/${repository.name}/${platform.dir}/categories.json`).then((prop: any) => {
        let p = prop.default.filter(function (item: any) {
          return item.type === 'dir';
        });
        if (p) {
          resolve(p);
        } else {
          reject();
        }
      }, (error: any) => {
        console.log(`${error}: ${repository.name} - ${platform.dir}`);
      });
    });
  }


  getJsonCategories(path: any): any {
    // TODO for now only for IoT-AppZone-SampleApps/ME910C1-ML865C1-NE910C1/

    return new Promise((resolve, reject) => {
      if (jsonCategories) {
        resolve(jsonCategories);
      } else {
        reject();
      }
    });
  }

  getJsonProjects(path: any): any {
    // TODO for now only for IoT-AppZone-SampleApps/ME910C1-ML865C1-NE910C1/

    return new Promise((resolve, reject) => {
      if (jsonProjects) {
        resolve(jsonProjects);
      } else {
        reject();
      }
    });
  }


  getPlatforms(type: string, path: string): any {
    switch (type) {
      case "JSON": {
        break;
      }
      case "ENV": {
        return new Promise((resolve, reject) => {
          if (envPlatforms) {
            resolve(envPlatforms);
          } else {
            reject();
          }
        });
        break;
      }
      case "API": {
        return this.httpClient.get<any>(path)
          .pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
          );
        break;
      }
      default: {
        //statements;
        console.log("error");
        break;
      }
    }
  }

  getCategories(type: string, path: string): any {
    switch (type) {
      case "JSON": {
        break;
      }
      case "ENV": {
        return new Promise((resolve, reject) => {
          if (envCategories) {
            resolve(envCategories);
          } else {
            reject();
          }
        });
        break;
      }
      case "API": {
        return this.httpClient.get<any>(path)
          .pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
          );
        break;
      }
      default: {
        //statements;
        console.log("error");
        break;
      }
    }
  }

  getList(type: string, path: string): any {
    switch (type) {
      case "JSON": {
        break;
      }
      case "ENV": {
        return new Promise((resolve, reject) => {
          if (envCategories) {
            resolve(envCategories);
          } else {
            reject();
          }
        });
        break;
      }
      case "API": {
        return this.httpClient.get<any>(path)
          .pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
          );
        break;
      }
      default: {
        //statements;
        console.log("error");
        break;
      }
    }
  }

  getFolderPlatform(path: any): any {
    return this.httpClient.get<any>(path)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

    // return this.httpClient.get<any>(path)
    //   .pipe(
    //     catchError(error => {
    //       if (error.error instanceof ErrorEvent) {
    //         this.errorMsg = `Error: ${error.error.message}`;
    //       } else {
    //         this.errorMsg = `Error: ${error.message}`;
    //       }
    //       return of({error: 'error'});
    //     })
    //   )
    //   .pipe(map(async res => {
    //       // successful
    //       res.push({id: 0, name: "All"});
    //       return res;
    //     })
    //   );
  }


  async getFolderContent(path: any): Promise<any> {
    const res = await this.httpClient.get<any>(path)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      ).toPromise();
    return res;
  }

  getProjects(type: string, path: string): any {
    switch (type) {
      case "JSON": {
        break;
      }
      case "ENV": {
        return new Promise((resolve, reject) => {
          if (envCategories) {
            resolve(envCategories);
          } else {
            reject();
          }
        });
        break;
      }
      case "API": {
        return this.httpClient.get<any>(path)
          .pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
          );
        break;
      }
      default: {
        //statements;
        console.log("error");
        break;
      }
    }
  }

  /*
  This data are obtained with the github rest API.
  GET request at: https://api.github.com/users/Telit/repos

  type can be:
  JSON -> fetch the information by src/assets/github-data/repository json files
  API  -> fetch the information by GitHub API
  ENV  -> fetch the information by Environment file
  */
  getRepositories(type: string, path: string): any {
    switch (type) {
      case "JSON": {
        return new Promise((resolve, reject) => {
          if (jsonRepositories) {
            resolve(jsonRepositories);
          } else {
            reject();
          }
        });
        break;
      }
      case "ENV": {
        //statements;
        break;
      }
      case "API": {
        return this.httpClient.get<any>(path)
          .pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
          );
        break;
      }
      default: {
        //statements;
        console.log("error");
        break;
      }
    }

    // .pipe(
    //   catchError(error => {
    //     if (error.error instanceof ErrorEvent) {
    //       this.errorMsg = `Error: ${error.error.message}`;
    //     } else {
    //       this.errorMsg = `Error: ${error.message}`;
    //     }
    //     return of({error: 'error'});
    //   })
    // )
    // .pipe(map(async res => {
    //     // successful
    //     res.push({id: 0, name: "All"});
    //     return res;
    //   })
    // );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


}
