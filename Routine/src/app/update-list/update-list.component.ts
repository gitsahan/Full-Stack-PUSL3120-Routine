import { Component,   OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.scss']
})
export class UpdateListComponent implements OnInit{

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) {}

  listId: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=>{
       this.listId = params.listId; 
      }
    )
  }

  updateList(title: string) {
    this.taskService.updateList(this.listId, title).subscribe(()=>{
      this.router.navigate(['/lists', this.listId]);
    })
  }

}
