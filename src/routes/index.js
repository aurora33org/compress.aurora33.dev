const express = require('express');
const router = express.Router();

const healthRouter = require('./health');
const jobsRouter = require('./jobs');

router.use('/health', healthRouter);
router.use('/jobs', jobsRouter);

module.exports = router;
