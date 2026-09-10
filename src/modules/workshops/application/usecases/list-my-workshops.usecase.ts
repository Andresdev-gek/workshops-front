import type { Workshop } from '../../domain/models/workshop.model'
import { getMyWorkshops } from '../../infrastructure/services/workshops.service'

export async function listMyWorkshopsUseCase(): Promise<Workshop[]> {
  return getMyWorkshops()
}
