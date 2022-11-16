import { Component, OnInit } from '@angular/core';
import { JobListService } from 'src/app/services/job-list/job-list.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobList: any;

  constructor(private jobListService: JobListService) { }

  ngOnInit(): void {
    this.jobListService.getJobList().subscribe((jobList: any) => {
      this.jobList = jobList;
    })
  }

}
