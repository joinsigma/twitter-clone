import { format } from 'date-fns'

export const formatDate = (date) => {
    return format(date.toDate(), 'MMM d')
}
