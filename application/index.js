// APPLICATION ROUTER
const router = require('application/router');

router.run(document.getElementById('mount-point'));

const surveyStore = require('application/stores/surveys-store');