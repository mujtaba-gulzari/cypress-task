function getCurrentDate() {

    const monthName = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = monthName[currentDate.getMonth()]
    const year = currentDate.getFullYear()

    const formattedDate = '${day} ${month}, ${year}'
    console.log(formattedDate)
    return formattedDate;
}

export { getCurrentDate };