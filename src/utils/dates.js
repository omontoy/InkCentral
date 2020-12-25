export function dateOfComment(date) {
  const commentDate = new Date(date)
  const commentYear = commentDate.getFullYear()
  const months = ['Jan', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec' ]
  const commentMonth = months[commentDate.getMonth()];
  const commentDay = commentDate.getDate()
  return [commentDay, commentMonth, commentYear]
}