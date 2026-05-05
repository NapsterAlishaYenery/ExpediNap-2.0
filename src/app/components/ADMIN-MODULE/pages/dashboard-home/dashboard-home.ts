import { Component } from '@angular/core';
import { SummarySectionAdmin } from '../../admin-layout/summary-section-admin/summary-section-admin';
import { ActivityListingComponent } from '../../admin-layout/activity-listing-component/activity-listing-component';

@Component({
  selector: 'app-dashboard-home',
  imports: [SummarySectionAdmin, ActivityListingComponent],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
})
export class DashboardHome {

}
