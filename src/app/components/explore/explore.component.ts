import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Repository} from "../../models/repository.models";
import {Platform} from "../../models/platform.models";
import {Categories} from "../../models/applications.models";
import {environment} from "../../../environments/environment";
import {GithubService} from "../../services/github/github.service";

const envSampleAppRepository = environment.githubConfig.sampleAppRepository;
const envMetadataFile = environment.githubConfig.metadata;

declare function downloadRepoFolder(message: any): any;

declare function GitZip(message: any): any;


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  platforms: Platform[] = Array<Platform>();
  repositories: Repository[] = Array<Repository>();
  categories: Categories[] = Array<Categories>();

  selectedRepository: any;// = new Repository(0, 'All');
  selectedPlatform: any; //Platform = new Platform(1, 'All');
  selectedCategories: any;
  selectedTag: string;

  faundApplications: any;

  constructor(private httpClient: HttpClient,
              private githubService: GithubService) {
    console.log("constructor");

    this.selectedTag = "*";

    this.faundApplications = [];
    //r.push({project: prj, metadata: metadata});
  }

  onChangeRepositories(newRepo: any) {
    //console.log(newRepo);
    this.selectedRepository = newRepo;
    // ... do other stuff here ...
  }


  getAllCategories() {
    let categoryList: any[] = [];
    this.githubService.getPlatforms("ENV", "").then((plat: any) => {

      plat = plat.filter(function (item: any) {
        return item.name != "All";
      });

      function getUniqueListBy(arr: any, key: any) {
        return [...new Map(arr.map((item: any) => [item[key], item])).values()]
      }

      for (let p = 0; p < plat.length; p++) {
        let platform = plat[p];

        this.githubService.getCategoriesByPlatform(this.selectedRepository, platform).then((cat: any) => {
          for (let c = 0; c < cat.length; c++) {
            categoryList.push(cat[c]);
          }
          categoryList.push({
            "id": 0,
            "name": "All",
            "dir": "-"
          });
          categoryList = getUniqueListBy(categoryList, 'name');
          categoryList = categoryList.filter(function (item: any) {
            return (
              item.name != 'AZX_Docs' &&
              item.name != 'pictures');
          });
          this.categories = categoryList;
          this.selectedCategories = this.categories[this.categories.length - 1];
        });
      }
    });
  }

  onChangePlatforms(newPlat: any) {
    //console.log(newPlat);
    this.selectedPlatform = newPlat;

    if (newPlat.name === 'All') {
      this.getAllCategories();

    } else {
      this.githubService.getCategoriesByPlatform(this.selectedRepository, this.selectedPlatform).then((appl: any) => {
        if (appl) {

          appl = appl.filter(function (item: any) {
            return (
              item.name != 'AZX_Docs' &&
              item.name != 'pictures');
          });

          this.categories = appl;

          let cAll = {
            "id": 0,
            "name": "All",
            "dir": "-"
          }
          this.categories.push(cAll);
          this.selectedCategories = cAll;
        } else {
          // TODO manage the error
          console.log("Error fetching categories/applications by platform!");
        }
      });
    }

  }

  onChangeCategories(newAppl: any) {
    //console.log(newAppl);
    this.selectedCategories = newAppl;
    // ... do other stuff here ...
  }

  generateCustomLink(data: any) {
    const location = data.project.html_url;

    downloadRepoFolder(location); // function call

    // this.githubService.getRemainingRateLimit().subscribe((resp: any) => {
    //   const remainingRateLimit = resp.headers.get('x-ratelimit-remaining');
    //
    //   console.log(`rate remaining: ${remainingRateLimit}`);
    //   if (remainingRateLimit > 2) {
    //     downloadRepoFolder(location); // function call
    //   } else {
    //
    //   }
    // });
  }

  ngOnInit(): void {
    console.log("ngOnInit");

    //this.githubService.getRepositories().subscribe((repo: any) => {
    this.githubService.getRepositories("JSON", "").then((repo: any) => {
      if (repo) {
        repo.push({id: 0, name: "All"});

        let s = repo.filter(function (item: any) {
          return item.name === envSampleAppRepository;
        });
        this.selectedRepository = s[0];
        //this.selectedRepository = this.repositories[this.repositories.length - 1];

        this.repositories = repo;
      } else {
        // TODO manage the error
        console.log("Error fetching Repositories!");
      }
    });


    this.githubService.getPlatforms("ENV", "").then((plat: any) => {
      if (plat) {
        this.platforms = plat;
        this.selectedPlatform = this.platforms[0];
      } else {
        // TODO manage the error
        console.log("Error fetching Platforms");
      }
    });

    this.getAllCategories();

  }

  onKeyUpEventFindIntoRepo(event: any) {
    //console.log("onKeyUpEventFindIntoRepo");
    this.selectedTag = event.target.value;

    // console.log(this.selectedTag);
    // console.log(this.selectedPlatform);
    // console.log(this.selectedRepository);
  }

  getApplications(selectedRepository: any, selectedPlatform: any, selectedCategories: any) {
    this.githubService.getApplication(selectedRepository, selectedPlatform, selectedCategories).then((applicationList: any) => {
      //console.log(applicationList);

      function appConteinPrj(originalArray: any, prj: any) {
        for (let i in originalArray) {
          if (originalArray[i]['project'].path === prj.path){
            return true;
          }
        }
        return false;
      }

      // function removeDuplicates(originalArray:any) {
      //   var newArray: any[] = [];
      //   var lookupObject: any[] = [];
      //
      //   for (var i in originalArray) {
      //     lookupObject[originalArray[i]] = originalArray[i];
      //   }
      //
      //   for (i in lookupObject) {
      //     newArray.push(lookupObject[i]);
      //   }
      //   return newArray;
      // }

      for (let appIndex = 0; appIndex < applicationList.length; appIndex++) {
        const prj = applicationList[appIndex];

        this.githubService.getContent(
          selectedRepository,
          selectedPlatform,
          selectedCategories,
          prj).then((content: any) => {

          let meta = content.filter(function (item: any) {
            return item.name === envMetadataFile;
          });

          if (meta.length == 1) {

            this.githubService.getMetadata(
              selectedRepository,
              selectedPlatform,
              selectedCategories,
              prj,
              meta[0]).then((metadata: any) => {
              const keywords = metadata.keywords;
              const tags = this.selectedTag.split(" ");

              for (let n = 0; n < tags.length; n++) {
                const tag = tags[n];
                for (let i = 0; i < keywords.length; i++) {
                  const key = keywords[i];

                  if (key.toUpperCase().includes(tag.toUpperCase())) {

                    if (!appConteinPrj(this.faundApplications, prj)) {
                      this.faundApplications.push({project: prj, metadata: metadata});
                    }
                    //this.faundApplications = removeDuplicates( this.faundApplications);
                  }


                  // let prjs: any[] = [];
                  // for (let pr = 0; pr < this.faundApplications.length; pr++) {
                  //   prjs.push(this.faundApplications[pr].project)
                  //   prjs[pr].id = pr;
                  // }
                  // prjs = getUniqueListBy(prjs, 'path');
                  //
                  // if (prjs.length > 0) {
                  //   console.log(prjs);
                  // }

                  //set this.faundApplications

                  console.log(key);
                }
              }
              //console.log(metadata.keywords);
            }, (error: any) => {
              console.log("getMetadata error!");
            });
          }
        }, (error: any) => {
          console.log("getContent error!");
        });
      }

    }, (error: any) => {
      console.log("getApplication error!");
    });
  }

  getReportWithPlatform(sR: any, sP: any, sC: any) {

    if (sC.name === 'All') {
      let filtredCat = this.categories.filter(function (item: any) {
        return (
          item.name != 'All' &&
          item.name != 'AZX_Docs' &&
          item.name != 'pictures');
      });

      for (let c = 0; c < filtredCat.length; c++) {
        let currCategories = filtredCat[c];

        sC = currCategories;
        this.getApplications(sR, sP, sC);
      }
    } else {
      this.getApplications(sR, sP, sC);
    }
  }

  onClickFindIntoRepo() {
    console.log("--------->onFindIntoRepo<---------");
    // TODO handle if "All" is selected

    let sR = this.selectedRepository;
    let sP = this.selectedPlatform;
    let sC = this.selectedCategories;

    console.log(this.selectedRepository.name);
    console.log(this.selectedPlatform.name);
    console.log(this.selectedCategories.name);
    console.log(this.selectedTag);

    this.faundApplications = [];

    function getUniqueListBy(arr: any, key: any) {
      return [...new Map(arr.map((item: any) => [item[key], item])).values()]
    }

    let filtredPlat: any[] = [];
    if (this.selectedPlatform.name == 'All') {
      filtredPlat = this.platforms.filter(function (item: any) {
        return (
          item.name != 'All');
      });
      filtredPlat = getUniqueListBy(filtredPlat, 'dir');

      for (let p = 0; p < filtredPlat.length; p++) {
        let currPlatform = filtredPlat[p];
        sP = currPlatform;
        this.getReportWithPlatform(sR, sP, sC);
      }

    } else {
      this.getReportWithPlatform(sR, sP, sC);
    }

    console.log("------------------------------------------------------------------");
    // this.selectedRepository = sR;
    // this.selectedPlatform = sP;
    // this.selectedCategories = sC;

    console.log(this.selectedRepository.name);
    console.log(this.selectedPlatform.name);
    console.log(this.selectedCategories.name);
    console.log(this.selectedTag);


  }


}



