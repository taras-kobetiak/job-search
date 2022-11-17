import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IJobFullInfo } from 'src/app/interfaces/jobFullInfo.interface';
import { IJob } from 'src/app/interfaces/job.interface';
import { JobListService } from 'src/app/services/job-list/job-list.service';
import { LocationInfoService } from 'src/app/services/location-info/location-info.service';


const JOB_NUMBER_PER_PAGE = 19;

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, OnDestroy {
  jobFullInfoList: IJobFullInfo[];
  jobListToShow: IJobFullInfo[];

  from: number = 0;
  to: number = JOB_NUMBER_PER_PAGE;
  pages: number[] = [];

  private unsubscribingData$: Subject<void> = new Subject<void>();

  constructor(
    private jobListService: JobListService,
    private locationInfo: LocationInfoService) { }

  ngOnInit(): void {
    this.jobListService.getJobList().pipe(
      takeUntil(this.unsubscribingData$)
    ).
      subscribe((jobList: IJob[]) => {
        this.jobFullInfoList = jobList;

        this.jobListToShow = this.jobFullInfoList.slice(this.from, this.to);
        let pagesAmount = Math.ceil(this.jobFullInfoList.length / JOB_NUMBER_PER_PAGE);
        for (let i = 1; i <= pagesAmount; i++) {
          this.pages.push(i)
        }

        this.jobFullInfoList.forEach((job: IJobFullInfo, index) => {
          job.isRated = false;
          job.stars = 0;

          // job.locationInfo = this.locationInfo.getLocationInfo(job.address);
          // job.locationInfo.subscribe((jobInfo) => {
          //   if (jobInfo.status === 'ZERO_RESULTS') {
          //     job.fullLocation = 'There are no objects at this address';
          //     job.shortLocation = 'No data';
          //   } else {

          //     job.fullLocation = jobInfo.results[0].formatted_address.replace(/[,]/g, ' - ');

          //     if (jobInfo.results[0].address_components.slice(-1)[0].long_name / 1 === NaN) {
          //       job.shortLocation = `${jobInfo.results[0].address_components.slice(-2.-1)[0].long_name}, ${jobInfo.results[0].address_components.slice(-1)[0].long_name}`
          //     } else {
          //       job.shortLocation = `${jobInfo.results[0].address_components.slice(-3,-2)[0].long_name}, ${jobInfo.results[0].address_components.slice(-2,-1)[0].long_name}`
          //     }
          //   }
          // })

          job.daysAgo = Math.round((Number(new Date()) - Number(new Date(job.createdAt))) / 1000 / 60 / 60 / 24);

          if (index === 2 || index === 5) {
            job.stars = 5;
          }
        })
      })
  }







  isRatedClick(job: IJobFullInfo): void {
    job.isRated = !job.isRated;
  }

  prevPage(): void {
    this.from -= JOB_NUMBER_PER_PAGE;
    this.to = this.from + JOB_NUMBER_PER_PAGE;
    if (this.from < 0) {
      this.from = 0;
      this.to = JOB_NUMBER_PER_PAGE;
    }
    this.jobListToShow = this.jobFullInfoList.slice(this.from, this.to);
  }

  nextPage(): void {



    this.from += JOB_NUMBER_PER_PAGE;
    this.to += JOB_NUMBER_PER_PAGE;
    if (this.to > this.jobFullInfoList.length) {
      this.from = this.pages.slice(-2, -1)[0] * JOB_NUMBER_PER_PAGE;
      this.to = this.jobFullInfoList.length;
    }
    this.jobListToShow = this.jobFullInfoList.slice(this.from, this.to);
    console.log(this.from, this.to);
  }

  ngOnDestroy(): void {
    this.unsubscribingData$.next();
    this.unsubscribingData$.complete();
  }
}
