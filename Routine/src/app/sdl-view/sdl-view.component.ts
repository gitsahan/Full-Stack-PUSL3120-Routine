import { Component } from '@angular/core';
import {OnInit} from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { List } from '../models/list.model';
import { Schedule } from '../models/schedule.model';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-sdl-view',
  templateUrl: './sdl-view.component.html',
  styleUrls: ['./sdl-view.component.scss']
})
export class SdlViewComponent implements OnInit{
  
  schedules: Schedule[];
  lists: List[];
  constructor (private taskService: TaskService, private route: ActivatedRoute, private router: Router,) {}

  selectedListId: string;

  ngOnInit () {

    this.route.params.subscribe(
      (params: Params)=>{
        if (params.listId) {
          this.selectedListId = params.listId;
        this.taskService.getSchedule(params.listId).subscribe((schedules: Schedule[])=>{
          this.schedules=schedules;
        })
      } else {
        this.schedules=undefined;
      }
      })

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists=lists;
    })

  }

  onScheduleClick(schedules: Schedule) {
    this.taskService.completed(schedules).subscribe(()=>{
      console.log("Completed Successfully.")
      schedules.completed = !schedules.completed;
    })
  }

  onDeleteListClick(){
    this.taskService.deleteList(this.selectedListId).subscribe((res: any)=>{
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onScheduleDelete(scheduleId: string){
    this.taskService.deleteSchedule(this.selectedListId, scheduleId).subscribe((res: any)=>{
      window.location.reload()
      console.log(res);
    })
  }
}