export function dateOfComment(date) {
  const commentDate = new Date(date)
  const commentYear = commentDate.getFullYear()
  let commentMonth = commentDate.getMonth()
  if(commentMonth===0) { commentMonth="Jan" }
  if(commentMonth===1) { commentMonth="Feb" }
  if(commentMonth===2) { commentMonth="Mar" }
  if(commentMonth===3) { commentMonth="Apr" }
  if(commentMonth===4) { commentMonth="May" }
  if(commentMonth===5) { commentMonth="Jun" }
  if(commentMonth===6) { commentMonth="Jul" }
  if(commentMonth===7) { commentMonth="Aug" }
  if(commentMonth===8) { commentMonth="Sep" }
  if(commentMonth===9) { commentMonth="Oct" }
  if(commentMonth===10) { commentMonth="Nov" }
  if(commentMonth===11) { commentMonth="Dec" }
  const commentDay = commentDate.getDate()
  return [commentDay, commentMonth, commentYear]
}