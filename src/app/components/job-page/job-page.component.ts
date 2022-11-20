import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IJobFullInfo } from 'src/app/interfaces/jobFullInfo.interface';

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
  ) { }

  ngOnInit(): void {
    this.jobName = this.activatedRote.snapshot.paramMap.get('title');
    let jobListJson = localStorage.getItem('jobList');
    if (jobListJson) {
      let fullJobList = JSON.parse(jobListJson);
      this.currentJob = fullJobList.find((job: IJobFullInfo) => job.name === this.jobName);
    }
  }

  updateJson(): void {
    let jobListJson = localStorage.getItem('jobList');
    if (jobListJson) {
      let fullJobList = JSON.parse(jobListJson);
      let newList = fullJobList.map((job: IJobFullInfo) => {
        return job.id !== this.currentJob.id ? job :
          this.currentJob;
      })
      localStorage.removeItem('jobList')
      localStorage.setItem('jobList', JSON.stringify(newList));
    }
  }

  isRatedClick(): void {
    this.currentJob.isRated = !this.currentJob.isRated;
    this.updateJson();
  }
}
