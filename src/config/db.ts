import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        await mongoose.connect( "mongodb+srv://bhatttejas30:E3xtM0s39iatv35r@backend.vvs18pv.mongodb.net/?retryWrites=true&w=majority&appName=backend", {
            dbName: "Todo",
        });
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

mongoose.connection.on('connecting', () => {
    console.log('Connecting to MongoDB...');
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
export default connectDB;