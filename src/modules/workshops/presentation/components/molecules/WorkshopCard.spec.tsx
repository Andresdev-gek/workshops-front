import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { WorkshopCard } from './WorkshopCard'

const workshop = {
  id: '1',
  name: 'Git Fundamentals',
  description: 'Aprende Git desde cero.',
  imageUrl: 'https://example.com/git.png',
  capacity: 10,
  availableSlots: 5,
  isFull: false,
  isLowAvailability: false,
  isEnrolled: false,
}

describe('WorkshopCard', () => {
  it('renders workshop name and capacity information', () => {
    render(<WorkshopCard workshop={workshop} onClick={vi.fn()} />)

    expect(screen.getByText(workshop.name)).toBeInTheDocument()
    expect(screen.getByText('Capacidad total: 10')).toBeInTheDocument()
    expect(screen.getByText('Cupos disponibles: 5')).toBeInTheDocument()
  })

  it('calls onClick when the card is clicked and it is available', () => {
    const handleClick = vi.fn()
    render(<WorkshopCard workshop={workshop} onClick={handleClick} />)

    fireEvent.click(screen.getByRole('article'))

    expect(handleClick).toHaveBeenCalledWith(workshop)
  })

  it('does not call onClick when the workshop is full and not enrolled', () => {
    const handleClick = vi.fn()
    render(<WorkshopCard workshop={{ ...workshop, isFull: true, availableSlots: 0 }} onClick={handleClick} />)

    fireEvent.click(screen.getByRole('article'))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('shows the enrolled badge and allows opening the info modal when already enrolled', () => {
    const handleClick = vi.fn()
    render(<WorkshopCard workshop={{ ...workshop, isEnrolled: true }} onClick={handleClick} />)

    expect(screen.getByText('Inscrito')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('article'))

    expect(handleClick).toHaveBeenCalledWith({ ...workshop, isEnrolled: true })
  })
})
