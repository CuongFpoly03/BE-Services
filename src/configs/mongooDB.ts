import mongoose from 'mongoose';

async function connectDb() {
    const url: string = 'mongodb://localhost:27017/project1';
    try {
        mongoose.connect(url);
        console.log('Connect success mongooDb');
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;
