import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'app/backend/services/loader.service';
import { LoadingConfig } from 'app/common/Constantes';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  public config = LoadingConfig;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}
