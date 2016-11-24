export function apiRepoToHtmlRepo(url) {
  return url.substring(0, url.indexOf('api')) +
    url.substring(url.indexOf('.') + 1, url.indexOf('repos')) +
    url.substring(url.indexOf('repos') +  6,url.length)
}
