import { Observable } from "rxjs";
import { IJob } from "./job.interface";

export interface IJobFullInfo extends IJob {
    isRated?: boolean;
    stars?: number;
    locationInfo?: Observable<any>;
    fullLocation?: string;
    shortLocation?: string;
    daysAgo?: number
}