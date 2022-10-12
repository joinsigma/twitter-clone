import { format } from 'date-fns'

export const formatDate = (date, dateFormat = 'MMM d') => {
    if (!date) return
    return format(date.toDate(), dateFormat)
}
