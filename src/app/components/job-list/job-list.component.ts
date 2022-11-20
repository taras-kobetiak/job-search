import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject, switchMap, takeUntil } from 'rxjs';
import { IJobFullInfo } from 'src/app/interfaces/jobFullInfo.interface';
import { IJob } from 'src/app/interfaces/job.interface';
import { JobInfoService } from 'src/app/services/job-info/job-info.service';
import { LocationInfoService } from 'src/app/services/location-info/location-info.service';
import { LoadingService } from 'src/app/services/loading/loading-service.service';

const JOB_NUMBER_PER_PAGE = 15;

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
  pages: number[];
  currentPage: number = 1;

  private unsubscribingData$: Subject<void> = new Subject<void>();

  constructor(
    private jobInfoService: JobInfoService,
    private locationInfo: LocationInfoService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    let jobListJson = localStorage.getItem('jobList');
    let pages = localStorage.getItem('pages');

    if (jobListJson && pages) {
      this.jobFullInfoList = JSON.parse(jobListJson);
      this.updateJobList();
      this.pages = JSON.parse(pages)



    } else {
      this.getJobList();
    }
  }

  getJobList(): void {
    this.loadingService.setValue(true);
    this.jobInfoService.getJobList().pipe(
      switchMap((jobList: IJob[]) => {
        this.jobFullInfoList = jobList;

        this.jobListToShow = this.jobFullInfoList.slice(this.from, this.to);
        let pagesAmount = Math.ceil(this.jobFullInfoList.length / JOB_NUMBER_PER_PAGE);
        this.pages = [];
        for (let i = 1; i <= pagesAmount; i++) {
          this.pages.push(i)
        }
        const addressArray = this.jobFullInfoList.map((job) => this.locationInfo.getLocationInfo(job.address));
        return forkJoin(addressArray);
      }),
      takeUntil(this.unsubscribingData$)
    ).
      subscribe((addressArray: any) => {
        this.setFullInfo(addressArray);
        this.setJsonData();
      })
    this.loadingService.setValue(false);
  }

  setFullInfo(addressArray: any): void {
    this.jobFullInfoList.forEach((job: IJobFullInfo, index) => {
      job.isRated = false;
      job.stars = 0;
      job.daysAgo = Math.round((Number(new Date()) - Number(new Date(job.createdAt))) / 1000 / 60 / 60 / 24);

      if (index === 2 || index === 5) {
        job.stars = 5;
      }

      if (addressArray[index].status === 'ZERO_RESULTS') {
        job.fullLocation = 'There are no objects at this address';
        job.shortLocation = 'No data';
      } else {
        job.fullLocation = addressArray[index].results[0].formatted_address.replace(/[,]/g, ' - ');

        if (isNaN(addressArray[index].results[0].address_components.slice(-1)[0].long_name / 1)) {
          addressArray[index].results[0].address_components.slice(-2, -1)[0] ?
            job.shortLocation = `${addressArray[index].results[0].address_components.slice(-2, -1)[0].long_name},
               ${addressArray[index].results[0].address_components.slice(-1)[0].long_name}` :
            job.shortLocation = `${addressArray[index].results[0].address_components.slice(-1)[0].long_name}`
        } else {
          job.shortLocation = `${addressArray[index].results[0].address_components.slice(-3, -2)[0].long_name},
               ${addressArray[index].results[0].address_components.slice(-2, -1)[0].long_name}`
        }
      }
    })
  }

  setJsonData(): void {
    let listJson = JSON.stringify(this.jobFullInfoList);
    localStorage.setItem('jobList', listJson);
    let pagesJson = JSON.stringify(this.pages);
    localStorage.setItem('pages', pagesJson);
  }

  upgradeJsonData(): void {
    localStorage.removeItem('jobList')
    let listJson = JSON.stringify(this.jobFullInfoList);
    localStorage.setItem('jobList', listJson);
  }

  isRatedClick(job: IJobFullInfo): void {
    job.isRated = !job.isRated;
    this.upgradeJsonData();
  }

  onStarClicked(): void {
    this.upgradeJsonData();
  }

  prevPage(): void {
    if (this.currentPage === this.pages[0]) {
      return;
    }
    this.currentPage -= 1;
    let input = document.getElementById(`${this.currentPage}`);
    input?.setAttribute('checked', 'true');

    this.from -= JOB_NUMBER_PER_PAGE;
    this.to = this.from + JOB_NUMBER_PER_PAGE;
    this.updateJobList();
  }

  nextPage(): void {
    if (this.currentPage === this.pages.slice(-1)[0]) {
      return;
    }
    this.currentPage += 1;
    let input = document.getElementById(`${this.currentPage}`)
    input?.setAttribute('checked', 'true')

    this.from += JOB_NUMBER_PER_PAGE;
    this.to = this.from + JOB_NUMBER_PER_PAGE;
    this.updateJobList();
  }

  pageClick(page: number): void {
    this.currentPage = page;
    this.from = (page - 1) * JOB_NUMBER_PER_PAGE;
    this.to = page * JOB_NUMBER_PER_PAGE;
    this.updateJobList();
  }

  updateJobList(): void {
    this.jobListToShow = this.jobFullInfoList.slice(this.from, this.to);
  }

  ngOnDestroy(): void {
    this.unsubscribingData$.next();
    this.unsubscribingData$.complete();
  }
}
