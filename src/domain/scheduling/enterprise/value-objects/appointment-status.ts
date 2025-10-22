export type AppointmentStatusType = 
  | 'pending'
  | 'confirmed' 
  | 'completed'
  | 'cancelled'

export class AppointmentStatus {
  private readonly value: AppointmentStatusType

  private constructor(value: AppointmentStatusType) {
    this.value = value
  }

  toValue(): AppointmentStatusType {
    return this.value
  }

  // Métodos estáticos para criar status
  static pending(): AppointmentStatus {
    return new AppointmentStatus('pending')
  }

  static confirmed(): AppointmentStatus {
    return new AppointmentStatus('confirmed')
  }

  static completed(): AppointmentStatus {
    return new AppointmentStatus('completed')
  }

  static cancelled(): AppointmentStatus {
    return new AppointmentStatus('cancelled')
  }

  isPending(): boolean {
    return this.value === 'pending'
  }

  isConfirmed(): boolean {
    return this.value === 'confirmed'
  }

  isCompleted(): boolean {
    return this.value === 'completed'
  }

  isCancelled(): boolean {
    return this.value === 'cancelled'
  }

  equals(status: AppointmentStatus): boolean {
    return this.value === status.toValue()
  }
}