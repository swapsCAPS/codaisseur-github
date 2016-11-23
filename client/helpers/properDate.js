import moment from 'moment'

export function date(githubTime) {
  return moment(githubTime).format('YYYY-MM-DD')
}

export function time(githubTime) {
  return moment(githubTime).format('HH:mm:ss')
}

export function dateTime(githubTime) {
  return moment(githubTime).format('YYYY-MM-DD HH:mm:ss')
}
