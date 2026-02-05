
import { PROJECT_DETAILS } from './lib/constant/projects';

console.log('Available Projects:', Object.keys(PROJECT_DETAILS));
if (PROJECT_DETAILS['web-novel']) {
    console.log('SUCCESS: web-novel is registered.');
} else {
    console.log('ERROR: web-novel is NOT found.');
}
