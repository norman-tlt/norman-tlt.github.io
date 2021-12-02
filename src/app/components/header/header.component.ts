import {Component, OnInit} from '@angular/core';
import {AssetService} from "../../services/asset/asset.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private assetService: AssetService) {
  }

  ngOnInit(): void {
  }

}
