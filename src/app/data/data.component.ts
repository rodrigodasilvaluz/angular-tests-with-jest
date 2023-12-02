import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FakeService, JsonplaceholderInterface, ObsJsonplaceholderInterface } from '@app/shared/services/fake.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  serviceData!: JsonplaceholderInterface;
  serviceDataWithMap!: ObsJsonplaceholderInterface;
  errorServise: any;
  greeting!: string;

  constructor(
    private fakeService: FakeService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.getServiceData();
    this.getServiceDataWithMap();
  }

  getServiceData(): void {
    this.fakeService.getDataByFixedId().subscribe({
      next: (data) => {
        this.serviceData = data;
        this.setGreeting();
      },
      error: (err) => {
        this.errorServise = err.statusText;
      }
    });
  }

  getServiceDataWithMap(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.fakeService.getDataByIdWithMap(id).subscribe({
      next: (data) => {
        this.serviceDataWithMap = data;
      },
      error: (err) => {
        this.errorServise = err.statusText;
      }
    });
  }

  setGreeting(): void {
    if (this.serviceData.time < 10) {
      this.greeting = "Good morning";
    } else if (this.serviceData.time < 20) {
      this.greeting = "Good day";
    } else {
      this.greeting = "Good evening";
    }
  }
}
