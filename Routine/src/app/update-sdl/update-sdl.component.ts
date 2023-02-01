import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-update-sdl',
  templateUrl: './update-sdl.component.html',
  styleUrls: ['./update-sdl.component.scss']
})
export class UpdateSdlComponent implements OnInit{

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) {}

  scheduleId: string;
  listId: string

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=>{
       this.scheduleId = params.scheduleId; 
       this.listId = params.listId; 
      }
    )
  }

  updateSchedules(title: string) {
    this.taskService.updateSchedule(this.listId, this.scheduleId, title).subscribe(()=>{
      this.router.navigate(['/lists', this.listId]);
    })
  }

}