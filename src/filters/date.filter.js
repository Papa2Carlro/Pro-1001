export default function dateFilter (value) {
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }

  return new Intl.DateTimeFormat('ru', options).format(new Date(value))
}
