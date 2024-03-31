const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAuthor,validateCampground} = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
    

router.get('/new',isLoggedIn, campgrounds.renderNewForm);

router.get('/:id')
    .get("/:id", catchAsync(campgrounds.showCampground))
    .put('/:id',isLoggedIn, isAuthor,upload.array('image'), validateCampground, catchAsync(campgrounds.editCampground))
    .delete('/:id',isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;