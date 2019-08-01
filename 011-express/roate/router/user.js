const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('get response data!'));
router.post('/', (req, res) => res.send('post response data!'));
router.put('/', (req, res) => res.send('put response data!'));
router.delete('/', (req, res) => res.send('delete response data!'));

module.exports = router;