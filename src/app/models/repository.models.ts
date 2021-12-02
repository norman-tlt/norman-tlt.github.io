import jsonRepositories from "src/assets/github-data/repository/repositories.json";

export class Repository {

  constructor(public id: number, public name: string) {
    this.id = id;
    this.name = name;
  }

}
