import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Task, TaskProps } from '@/domain/scheduling/enterprise/entities/task'


export function makeTask(
  override: Partial<TaskProps> = {},
  id?: UniqueEntityID,
) {
  const task = Task.create(
    {
      title: 'Example task',
      description: 'Example description',
      isCompleted: false,
      ...override,
    },
    id,
  )

  return task
}