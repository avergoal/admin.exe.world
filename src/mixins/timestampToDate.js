const timestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000)

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'pm' : 'am'

    return `${day}.${month}.${year} / ${hours}:${minutes} ${ampm}`
}
export default timestampToDate
