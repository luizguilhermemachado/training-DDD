import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Client, ClientProps } from '@/domain/scheduling/enterprise/entities/client'

export function makeClient(
  override: Partial<ClientProps> = {},
  id?: UniqueEntityID,
) {
  const client = Client.create(
    {
      name: faker.person.firstName(),
      telephone: faker.phone.number(),
      email: faker.internet.email(),
      ...override,
    },
    id,
  )

  return client
}