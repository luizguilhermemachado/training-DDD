
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

import { AggregateRoot } from "@/core/entities/aggregate-root"
import { AppointmentStatus } from "../value-objects/appointment-status"
import { Either, left, right } from "@/core/either"
import { Optional } from "@/core/@types/optional"


export interface AppointmentProps {
    clientId: UniqueEntityID
    professionalId: UniqueEntityID
    serviceId: UniqueEntityID
    scheduledAt: Date
    status: AppointmentStatus
    createdAt: Date
    updatedAt?: Date
}

export class Appointment extends AggregateRoot<AppointmentProps> {
    
    private constructor(props: AppointmentProps, id?: UniqueEntityID) {
        super(props, id)
    }
    
    get clientId() {
        return this.props.clientId
    }
    
    get professionalId() {
        return this.props.professionalId
    }

    get serviceId() {
        return this.props.serviceId
    }

    get scheduledAt() {
        return this.props.scheduledAt
    }

    get status() {
        return this.props.status
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    confirm() {
        if (!this.status.isPending()) {
            return left(new Error('Only pending appointments can be confirmed'))
        }

        this.props.status = AppointmentStatus.confirmed()
        this.touch()
        return right(undefined)
    }

    complete() {
        if (!this.status.isConfirmed()) {
            return left(new Error('Only confirmed appointments can be completed'))
        }

        this.props.status = AppointmentStatus.completed()
        this.touch()
        return right(undefined)
    }

    cancel(): Either<Error, void> {
        if (this.status.isCancelled()) {
            return left(new Error('Appointment already cancelled'))
        }

        if (this.status.isCompleted()) {
            return left(new Error('Cannot cancel completed appointment'))
        }

        const now = new Date()
        const hoursUntilAppointment = (this.scheduledAt.getTime() - now.getTime()) / 1000 / 60 / 60
        
        if (hoursUntilAppointment < 2) {
            return left(new Error('Cannot cancel less than 2 hours before appointment'))
        }

        this.props.status = AppointmentStatus.cancelled()
        this.touch()
        return right(undefined)
    }

    reschedule(newDate: Date): Either<Error, void> {
        if (this.status.isCancelled()) {
            return left(new Error('Cannot reschedule cancelled appointment'))
        }

        if (this.status.isCompleted()) {
            return left(new Error('Cannot reschedule completed appointment'))
        }

        const now = new Date()
        if (newDate <= now) {
            return left(new Error('Cannot schedule in the past'))
        }

        this.props.scheduledAt = newDate
        this.touch()
        return right(undefined)
    }
    
    private touch() {
        this.props.updatedAt = new Date()
    }

    static create(
        props: Optional<AppointmentProps, 'createdAt' | 'status'>, 
        id?: UniqueEntityID
    ) {
        const appointment = new Appointment({
            ...props,
            status: props.status ?? AppointmentStatus.pending(),
            createdAt: props.createdAt ?? new Date()
        }, id)

        return appointment
    }
}