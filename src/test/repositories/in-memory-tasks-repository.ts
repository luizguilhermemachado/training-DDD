
import { TasksRepository } from "@/domain/scheduling/application/repositories/task-repository";
import { Task } from "@/domain/scheduling/enterprise/entities/task";


export class InMemoryTasksRepository implements TasksRepository{
    public items: Task[] = []

    async create(task: Task) {
        this.items.push(task);
    }

    async findById(id: string){
        const task = this.items.find((item) => item.id.toString() === id)

        if(!task){
            return null
        }

        return task
    }

    async save(task: Task){
        const index = this.items.findIndex((item) => item.id.toString() === task.id.toString())

        this.items[index] = task
    }

   async delete(id: string): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id.toString() === id)
        
        this.items.splice(itemIndex, 1)
    }
    
}