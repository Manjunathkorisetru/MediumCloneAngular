import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GetUserProfileResponseInterface } from '../types/getUserProfileResponse.interface';
import { UserProfileInterface } from '../types/userProfile.interface';

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<UserProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${slug}`;

    return this.http
      .get<GetUserProfileResponseInterface>(url)
      .pipe(map((response) => response.profile));
  }
}
