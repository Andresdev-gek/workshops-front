import type { Reservation } from '../../domain/models/reservation.model'
import { enrollInWorkshop } from '../../infrastructure/services/workshops.service'

export async function enrollInWorkshopUseCase(workshopId: string): Promise<Reservation> {
  return enrollInWorkshop(workshopId)
}
