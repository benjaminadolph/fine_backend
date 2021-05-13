const express = require('express');
const SymptomCategory = require('../models/SymptomCategory');
const User = require('../models/User');
const verify = require('./verifyToken');

const router = express.Router();
const { symptomsCategoriesValidation } = require('../validation');

// Gets all symptomCateories from User
router.get('/', verify, async (req, res) => {
  const id = req.query.userid;
  try {
    User.findOne({ _id: id })
      .populate('symptomsCategories')
      .then((result) => {
        res.json(result.symptomsCategories);
      });
  } catch (err) {
    res.json(err);
  }
});

// Submits a symptomCateory
router.post('/', verify, async (req, res) => {
  const { error } = symptomsCategoriesValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const symptomCategory = new SymptomCategory({
    userid: req.body.userid,
    title: req.body.title,
  });
  try {
    const savedSymptomCategory = await symptomCategory.save();
    User.findOne({ _id: symptomCategory.userid }, (err, user) => {
      if (user) {
        // The below two lines will add the newly saved emotion
        // ObjectID to the the User's emotion array
        user.symptomsCategories.push(savedSymptomCategory);
        user.save();
      }
    });
    res.json(savedSymptomCategory);
  } catch (err) {
    res.json(err);
  }
});

// Delete a specific symptomCateory
router.delete('/:symptomCategoryId', verify, async (req, res) => {
  const symptomCategory = req.query.symptomCategoryid;
  const user = req.query.userid;
  try {
    const removedSymptomCategory = await SymptomCategory.deleteOne({ _id: symptomCategory });
    // eslint-disable-next-line no-unused-vars
    const updatedUser = await User.updateOne(
      { _id: user },
      { $pull: { symptomsCategories: symptomCategory } },
    );
    res.json(removedSymptomCategory);
  } catch (err) {
    res.json(err);
  }
});

// Update a specific symptomCateory
router.patch('/:symptomCategoryId', verify, async (req, res) => {
  try {
    const updatedSymptomCategory = await SymptomCategory.updateOne(
      { _id: req.params.symptomCategoryId },
      {
        $set:
        {
          userid: req.body.userid,
          title: req.body.title,
        },
      },
    );
    res.json(updatedSymptomCategory);
  } catch (err) {
    res.json(err);
  }
});

// Get back a specific symptomCateory
router.get('/:symptomCategoryId', verify, async (req, res) => {
  try {
    const specificSymptomCategory = await SymptomCategory.findById(req.params.symptomCategoryId);
    res.json(specificSymptomCategory);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
