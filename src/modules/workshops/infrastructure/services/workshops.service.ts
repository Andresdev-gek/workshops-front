import { buildUrl, get, post } from '../../../../shared/http/api-client'
import type { Reservation } from '../../domain/models/reservation.model'
import type { Workshop } from '../../domain/models/workshop.model'

export async function getAllWorkshops(): Promise<Workshop[]> {
  return get<Workshop[]>(buildUrl('/workshops'))
}

export async function getMyWorkshops(): Promise<Workshop[]> {
  return get<Workshop[]>(buildUrl('/workshops/mine'))
}

export async function enrollInWorkshop(workshopId: string): Promise<Reservation> {
  return post<Reservation>(buildUrl(`/workshops/${workshopId}/reservations`), {})
}
