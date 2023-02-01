import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Schedule } from '../models/schedule.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-sdl',
  templateUrl: './new-sdl.component.html',
  styleUrls: ['./new-sdl.component.scss']
})
export class NewSdlComponent implements OnInit {

  constructor (private taskService: TaskService, private route: ActivatedRoute, private router: Router) {}

  listId : string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=>{
        this.listId = params['listId'];
        console.log(this.listId);
      })
}
createSchedule(title: string) {
  this.taskService.createSchedule(title, this.listId).subscribe((newSchedule: Schedule)=>{
    this.router.navigate(['../'], {relativeTo: this.route});
  })
}
}