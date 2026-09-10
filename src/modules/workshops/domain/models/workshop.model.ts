export interface Workshop {
  id: string
  name: string
  description: string
  imageUrl: string
  capacity: number
  availableSlots: number
  isFull: boolean
  isLowAvailability: boolean
  isEnrolled: boolean
}

export type WorkshopTab = 'all' | 'mine'
