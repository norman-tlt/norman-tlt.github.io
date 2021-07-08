import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  platforms: Platform[] = Array<Platform>();
  repositories: Repository[] = Array<Repository>();

  // selectedPlatform: Platform = new Platform(1, 'All');

  constructor() {
    console.log("constructor");
  }

  ngOnInit(): void {
    console.log("ngOnInit");

    this.repositories = [
      new Repository(1, 'All'),
      new Repository(2, 'SampleApp'),
      new Repository(3, 'TelitRepo'),
    ];

    this.platforms = [
      new Platform(1, 'All'),
      new Platform(2, 'ME910C1'),
      new Platform(3, 'ML865C1'),
      new Platform(4, 'NE910C1'),
      new Platform(5, 'ME310G1'),
      new Platform(6, 'ME910G1'),
      new Platform(7, 'ML865G1'),
    ];
  }

  onKeyUpEvent(event: any) {
    console.log("onKeyUpEvent");
    console.log(event.target.value);
  }
}

export class Platform {
  constructor(public id: number, public name: string) {
    this.id = id;
    this.name = name;
  }
}

export class Repository {
  constructor(public id: number, public name: string) {
    this.id = id;
    this.name = name;
  }
}
