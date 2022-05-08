import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationConfigService {
  endpointPrefix = '';
  private microFrontend = false

  constructor() {
  }

  setEndpointPrefix(endpoint: string) {
    this.endpointPrefix = endpoint;
  }

  setMicrofrontEnd(frontend: boolean) {
    this.microFrontend = frontend;
  }

  isMicrofrontend(): boolean {
    return this.microFrontend;
  }

  getEndpointFor(api: string, microservice?: string): string {
    if (microservice) {
      return `${this.endpointPrefix}services/${microservice}/${api}`
    }
    return `${this.endpointPrefix}${api}`
  }

}
