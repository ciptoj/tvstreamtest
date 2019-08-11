import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserController } from "./controller/userController";
import * as bodyParser from "body-parser";
class App {
  public app: express.Application = express();
  public userController: UserController = new UserController();
  public mongoServer = new MongoMemoryServer();

  constructor(){
    this.startDB();
    this.startConfiguring();
    this.registerRoutes();
    this.startListening();
  }
  private startConfiguring(){
    this.app.use(bodyParser.json()); // support json encoded bodies
    this.app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  }
  private async startDB(){
    mongoose.Promise = Promise;
    this.mongoServer.getConnectionString().then((mongoUri) => {
        const mongooseOpts = {
          // options for mongoose 4.11.3 and above
          autoReconnect: true,
          reconnectTries: Number.MAX_VALUE,
          reconnectInterval: 1000,
          useMongoClient: true, // remove this line if you use mongoose 5 and above
        };

        mongoose.connect(mongoUri, mongooseOpts);

        mongoose.connection.on('error', (e) => {
          if (e.message.code === 'ETIMEDOUT') {
            console.log(e);
            mongoose.connect(mongoUri, mongooseOpts);
          }
          console.log(e);
        });

        mongoose.connection.once('open', () => {
          console.log(`MongoDB successfully connected to ${mongoUri}`);
        });
    });
  }
  private registerRoutes(){
    this.app.route('/user')
    .post(this.userController.addNewUser);

  }
  private startListening(){
    this.app.listen(5001);
  }
}

new App();

