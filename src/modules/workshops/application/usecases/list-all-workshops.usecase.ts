import type { Workshop } from '../../domain/models/workshop.model'
import { getAllWorkshops } from '../../infrastructure/services/workshops.service'

export async function listAllWorkshopsUseCase(): Promise<Workshop[]> {
  return getAllWorkshops()
}
