import { Injectable } from '@angular/core';
import { Schedule } from './models/schedule.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { } 

  getLists() {
    return this.webReqService.get('list');
  }

  createList (title: string) {

    return  this.webReqService.post('list', {title});
  }

  updateList (id: string, title: string) {

    return  this.webReqService.patch(`list/${id}`, {title});
  }

  updateSchedule (scheduleId: string, listId: string, title: string) {

    return  this.webReqService.patch(`list/${listId}/schedules/${scheduleId}`, {title});
  }

  deleteList (id: String) {
    return this.webReqService.delete(`list/${id}`);
  }

  getSchedule (listId: string) {
    return this.webReqService.get(`list/${listId}/schedules`);
  }

  createSchedule (title: string, listId: string) {

    return this.webReqService.post(`list/${listId}/schedules`, {title});
  }

  completed(schedules: Schedule) {
    return this.webReqService.patch(`list/${schedules._listId}/schedules/${schedules._id}`, {
      completed: !schedules.completed
    });
  }

  deleteSchedule (listId: string, scheduleId: string) {
    return this.webReqService.delete(`list/${listId}/schedules/${scheduleId}`);
  }

}