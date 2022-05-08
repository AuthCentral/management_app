import {Injectable, NgZone, SecurityContext} from '@angular/core';
import {AlertType} from "../models/constants/alert-type";
import {DomSanitizer} from "@angular/platform-browser";

export interface Alert {
  id?: number;
  type: AlertType,
  message?: string,
  timeout?: number,
  toast?: boolean,
  position?: string,
  close?: (alerts: Alert[]) => void;
}

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  timeout = 5000
  toast = true;
  position = 'top right';
  private alertId = 0;
  private alerts: Alert[] = [];

  constructor(private sanitizer: DomSanitizer, private ngZone: NgZone) {
  }

  clear(): void {
    this.alerts = [];
  }

  get(): Alert[] {
    return this.alerts;
  }

  addAlert(alert: Alert, extAlerts?: Alert[]): Alert {
    alert.id = this.alertId++;
    alert.message = this.sanitizer.sanitize(SecurityContext.HTML, alert.message ?? '') ?? '';
    alert.timeout = alert.timeout ?? this.timeout;
    alert.toast = alert.toast ?? this.toast;
    alert.position = alert.position ?? this.position;
    alert.close = (alertArray: Alert[]) => this.closeAlert(alert.id!, alertArray);

    (extAlerts ?? this.alerts).push(alert);

    if (alert.timeout > 0) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.ngZone.run(() => {
            this.closeAlert(alert.id!, extAlerts ?? this.alerts)
          });
        }, alert.timeout)
      })
    }
    return alert;

  }

  private closeAlert(alertId: number, extAlerts: Alert[]): void {
    const alerts = extAlerts ?? this.alerts;
    const alertIndex = alerts.map(alert => alert.id).indexOf(alertId);
    if (alertIndex >= 0) {
      alerts.splice(alertIndex, 1);
    }
  }
}
