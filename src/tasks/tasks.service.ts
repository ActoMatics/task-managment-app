import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { }

    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status == status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search)
    //         );
    //     }
    //     return tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Oops! we could not find task with id ${id}`);
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.save();

        return task;
    }

    // deleteTaskById(id: string): void {
    //     let foundTask = this.getTskById(id);

    //     this.tasks = this.tasks.filter(task => task.id !== foundTask.id);
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTskById(id);
    //     task.status = status;
    //     return task;
    // }

}