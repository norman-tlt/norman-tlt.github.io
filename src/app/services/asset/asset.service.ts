import {Injectable} from '@angular/core';
import {GithubService} from "../github/github.service";
import {environment} from "../../../environments/environment";

const envGitServer = environment.githubConfig.server;
const envRepositories = environment.githubConfig.api.getRepositories;
const envMetadataFile = environment.githubConfig.metadata;
const envSampleAppRepository = environment.githubConfig.sampleAppRepository;

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private githubService: GithubService) {
  }

  generateJsonRepository() {

    let currentRepository: any;
    let currentPlatform: any;
    let currentCategories: any;

    this.githubService.getRepositories("API", `${envGitServer}/${envRepositories}`).subscribe((repositories: any) => {

      // TODO repositories ---> repositories.json
      console.log(repositories);

      // TODO for now only for IoT-AppZone-SampleApps repositories
      let repos = repositories.filter(function (repository: any) {
        return repository.name === envSampleAppRepository;
      });

      if (repos.length == 1) {

        currentRepository = repos[0];
        console.log(currentRepository.url);
        //https://api.github.com/repos/telit/IoT-AppZone-SampleApps/contents/
        this.githubService.getPlatforms("API", `${currentRepository.url}/contents/`).subscribe((platforms: any) => {
          if (platforms) {
            let plats = platforms.filter(function (platform: any) {
              return platform.type === 'dir';
            });

            // TODO plats ---> platforms.json
            console.log(plats);

            plats.forEach(async (plt: any) => {
              const pltUrl = plt.url;

              //get categories <-> applications
              this.githubService.getCategories("API", pltUrl).subscribe((categories: any) => {
                let cats = categories.filter(function (category: any) {
                  return category.type === 'dir';
                });

                // TODO cats ---> categories.json
                console.log(cats);

                cats.forEach(async (cts: any) => {
                  const ctsUrl = cts.url;

                  this.githubService.getProjects("API", ctsUrl).subscribe((projects: any) => {
                    let projs = projects.filter(function (prj: any) {
                      return prj.type === 'dir';
                    });

                    // TODO proj ---> projects.json
                    console.log(projs);

                    projs.forEach(async (prj: any) => {
                      const prjUrl = prj.url;

                      this.githubService.getList("API", prjUrl).subscribe((list: any) => {

                        // TODO lists ---> list.json
                        console.log(list);

                        let meta = list.filter(function (item: any) {
                          return item.name === envMetadataFile;
                        });

                        if (meta.length == 1) {

                          this.githubService.getMetadata(
                            currentRepository,
                            currentPlatform,
                            currentCategories,
                            prj,
                            meta[0]).then((metadata: any) => {

                          }, (error: any) => {
                            console.log("githubService.getMetadata error!");
                          });

                        }
                      }, (error: any) => {
                        console.log("githubService.getList error!");
                      });

                    });


                  }, (error: any) => {
                    console.log("githubService.getProjects error!");
                  });

                });


              }, (error: any) => {
                console.log("githubService.getCategories error!");
              });


            });
          }

        }, (error: any) => {
          console.log("githubService.getPlatforms error!");
        });
      }
    }, (error: any) => {
      console.log("githubService.getRepositories error!");
    });
  }
}
