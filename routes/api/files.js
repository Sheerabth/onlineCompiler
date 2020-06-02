const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   POST api/files
// @desc    Create A File
// @access  Private
router.post('/:id', auth, (req, res) => {
    const newFile = {
        id: req.body.id,
        name: req.body.name,
        mode: req.body.mode,
        value: req.body.value
    };
    User
        .findById(req.params.id)
        .then(user => {
            user.files.push(newFile)
            User
                .findByIdAndUpdate(req.params.id,
                    {
                        files: user.files
                    },
                    {
                        new: true,
                        runValidators: true
                    })
                .then(user => res.json({ success: true}))
                .catch(error => res.status(404).json({ success: false, error }));
        })
        .catch(error => res.status(404).json({ success: false, error }));
});

// @ route  POST api/files/modify/:id
// @ desc   Modify A File
// @ access Private
router.post('/modify/:id', auth, (req, res) => {
    console.log(req.body.value);
    const updatedFile = {
        id: req.body.id,
        name: req.body.name,
        mode: req.body.mode,
        value: req.body.value
    };
    var files = [];
    User
        .findById(req.params.id)
        .then(user => {
            files = user.files.map(file => {
                return (req.body.id === file.id ? (updatedFile) : (file))
            });
            User
                .findByIdAndUpdate(req.params.id,{
                        files: files
                    },
                    {
                        new: true,
                        runValidators: true
                    })
                .then(user => res.json({ success: true}))
                .catch(error => res.status(404).json({ success: false, error }));
        })
        .catch(error => res.status(404).json({ success: false, error }));
});

// @route   POST api/files/delete/:id
// @desc    Delete A File
// @access  Private
router.post('/delete/:id', auth, (req, res) => {
    console.log(req.params.id, req.body.id);
    var files = [];
    User
        .findById(req.params.id)
        .then(user => {
            files = user.files.filter(file => file.id !== req.body.id)
            User
            .findByIdAndUpdate(req.params.id,{
                    files: files
                },
                {
                    new: true,
                    runValidators: true   
                })
            .then(user => res.json({ success: true, user}))
            .catch(error => res.status(404).json({ success: false, error }));
        })
        .catch(error => res.status(404).json({ success: false, error }));
});

module.exports = router;