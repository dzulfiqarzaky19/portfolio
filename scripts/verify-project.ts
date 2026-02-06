import { PROJECT_DETAILS } from '../src/lib/constant/projects'

console.log('Available Projects:', Object.keys(PROJECT_DETAILS))
if (Object.keys(PROJECT_DETAILS).includes('web-novel')) {
  console.log('SUCCESS: web-novel is registered.')
} else {
  console.log('ERROR: web-novel is NOT found.')
}
