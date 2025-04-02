import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  emailAddress: { type: String, unique: true },
  password: String,
  mobile_no: Number,
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
});

const reviewSchema= new mongoose.Schema({

  bookName:{type:String, required:true},
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId,required: true,ref: 'User'}
})

const bookSchema = new mongoose.Schema({

  bookName: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  publishedDate: { type: String, required: true },
  imageUrl: { type: String, required: true },
  reviews: [reviewSchema],
  rating: {type: Number, required: true,default: 0},
  numReviews: {type: Number,required: true, default: 0}
 
});



const User = mongoose.model("User_Profiles", userSchema);
const Books = mongoose.model("Book_Details", bookSchema);
const Review=mongoose.model("Reviews",reviewSchema);

export {User,Books,Review}