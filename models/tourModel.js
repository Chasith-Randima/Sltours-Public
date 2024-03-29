const mongoose = require('mongoose');
const slugify = require('slugify');
//const User = require("./userModel");
//const validator = require("validator");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour must have less or equal than 40 charactors'],
      minlength: [10, 'A tour must have more or equal than 10 charactors'],
      //validate:[validator.isAlpha,"Tour must only contain charactors."]
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },

    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a max group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty must be either easy , medium or difficult',
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Ratings must be above 1'],
      max: [5, 'Ratings must be belovw 5'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'discount price ({VALUE})must be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summery'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a image cover'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

<<<<<<< HEAD
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });
=======
// tourSchema.index({ price: 1, ratingsAverage: -1 });
// tourSchema.index({ slug: 1 });
// tourSchema.index({ startLocation: '2dsphere' });
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

<<<<<<< HEAD
tourSchema.pre('save', function () {
=======
tourSchema.pre('save', function (next) {
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre("save",async function(next){

//     const guidesPromises = this.guides.map(async id => await User.findById(id));
//     this.guides = await Promise.all(guidesPromises);
//     next();
// });

// tourSchema.pre("save",function(){
//     console.log("will save documents");
// });

// tourSchema.post("save",function(doc, next){
//     console.log(doc);
//     next();
// });

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();

  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });

  next();
});

<<<<<<< HEAD
// tourSchema.post(/^find/,function(docs,next){

//     console.log(`query got ${Date.now()-this.start}`);
//     next();
// });
=======
tourSchema.post(/^find/, function (docs, next) {
  console.log(`query got ${Date.now() - this.start}`);
  next();
});
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e

// tourSchema.pre("aggregate",function(next){

//     this.pipeline().unshift({$match:{secretTour:{$ne:true}}});
//     next();
// })

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
