var mongoclient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
//"mongodb://sdpUser:SelaMongo2018@104.40.209.16:27017/admin"

const JSON = require('circular-json');
class DAL {
    constructor() {
        mongoclient.connect("mongodb+srv://shay:mongodb@myclust-yzzgd.mongodb.net", (err, db) => {
            if (err) console.log(err.message);
            else this.Database = db.db('MyEvents');
            // this.Database = db.db('MyEvents');
            this.userCollection = this.Database.collection('Users');
            this.EventCollection = this.Database.collection('Events');

            // .find({}).toArray((err,resultarr) => {;
            //         this.EventCollection = resultarr;
            // });
        });
    }

    findUserByMail(user, callback) {
        this.userCollection.findOne({ 'email': user.email }, (err, result) => {
            if (err) callback(null);
            else callback(result);//ToDo
        });
    }

    addUser(user, callback) {
        this.userCollection.save(user, (err, res) => {
            if (err) console.log(err.message);
            else callback(res);
        });
    }

    subscribeToEvent(user, event, callback) {
        this.EventCollection.update({ '_id': ObjectId(event.event._id) }, { $addToSet: { 'subscribers': { 'email': user.email, 'name': user.name } } }, (err, res) => {
            if (err)
                console.log(err.message);
            else {

                callback(res);
            }
        });
    }

    DeleteEvent(event) {
        this.EventCollection.deleteOne({ '_id': ObjectId(event._id) });
    }

    UpdateEvent(event) {
        try {
            const id = event._id;
            delete event._id;
            this.EventCollection.updateOne({ '_id': ObjectId(id) }, { $set: event }, (err, res) => {
                if (err) {

                    console.log(err.message);
                } else {

                    console.log(res);
                }
            });
        } catch (error) {

        }
    }

    getEventsByUser(user, callback) {
        this.EventCollection.find({ 'publisher.email': user.email }).toArray((err, resultarr) => {
            callback(resultarr);
        });
    }
    getEvents(callback) {
        this.EventCollection.find({}).toArray((err, resultarr) => {
            ;
            callback(resultarr);
        });
    }

    addEvent(event, callback) {
        console.log("this.EventCollection: ", event);
        this.EventCollection.save(event, (err, res) => {
            if (err) console.log("addEvent ", err.message);
            else callback(res);
        });
    }

}
module.exports = new DAL();