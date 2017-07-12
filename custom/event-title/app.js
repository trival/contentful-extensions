const cfExt = window.contentfulExtension || window.contentfulWidget

const monthNames = [
  "Januar", "Februar", "März",
  "April", "Mai", "Juni", "Juli",
  "August", "September", "Oktober",
  "November", "Dezember"
]


cfExt.init(api => {
  const titleField = api.field
  const dateField = api.entry.fields.date
  const placeField = api.entry.fields.place

  const input = document.getElementById('event-title')

  api.window.updateHeight()

  let date = dateField.getValue()
  let place = placeField.getValue()

  dateField.onValueChanged(val => {
    date = val
    setTitle()
  })
  placeField.onValueChanged(val => {
    place = val
    setTitle()
  })

  function setTitle () {
    let value = formatDate(date) + (place ? ' - ' + place : '')
    value = value.substr(0, 254)
    input.value = value
    if (value != titleField.getValue()) {
      console.log('Old Title', titleField.getValue())
      console.log('New Title', value)
      titleField.setValue(value)
    }
  }

  function pad (num) {
    return ('0' + num).slice(-2)
  }

  function formatDate (dateStr) {
    const date = new Date(dateStr)

    const day = pad(date.getDate())
    const monthIndex = date.getMonth()
    const year = date.getFullYear()
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())

    return day + '. ' + monthNames[monthIndex] + ' ' + year + ' - ' + hours + ':' + minutes
  }

})
