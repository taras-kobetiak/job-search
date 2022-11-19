import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IJobFullInfo } from 'src/app/interfaces/jobFullInfo.interface';
import { JobInfoService } from 'src/app/services/job-info/job-info.service';
import { LoadingService } from 'src/app/services/loading/loading-service.service';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss']
})
export class JobPageComponent implements OnInit {

  jobName: any;
  currentJob: IJobFullInfo;

  constructor(
    private activatedRote: ActivatedRoute,
    private jobInfoService: JobInfoService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.jobName = this.activatedRote.snapshot.paramMap.get('title');

    let jobListJson = localStorage.getItem('jobList');
    if (jobListJson) {
      let fullJobList = JSON.parse(jobListJson);
      this.currentJob = fullJobList.find((job: IJobFullInfo) => job.name === this.jobName);
    }
  }
}
