 const mongoose = require('mongoose');
const cities = require('./seeds');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')


main().catch(err => console.log("Mongo Connection Error", err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log("connected to mongo!!")
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) +10;
        const camp = new Campground({
            author: '66000178724d19931c8a10dc',
            location: `${cities[random1000].city} ,${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url : "https://res.cloudinary.com/dlqlmlaga/image/upload/v1711527375/YelpCamp/jl920evgdcmycqfilv9x.jpg",
                    filename : "YelpCamp/jl920evgdcmycqfilv9x"
                },
                {
                    url : "https://res.cloudinary.com/dlqlmlaga/image/upload/v1711527405/YelpCamp/qirlz6zghgdu5prkldzb.jpg",
                    filename : "YelpCamp/qirlz6zghgdu5prkldzb", 
                }
            ],
            //image: 'https://images.unsplash.com/collections/483251',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit debitis alias, vitae nisi excepturi nobis facilis hic quod maiores maxime aut, quas eaque porro nulla labore architecto, quidem aliquam adipisci!",
            price,
        })
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
});