import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserController } from "./controller/userController";
import { HomeController } from "./controller/HomeController";
import { AuthController } from "./controller/AuthController";

import * as bodyParser from "body-parser";
import { User, IUser } from "./model/userModel";
import mustacheExpress from "mustache-express";
import {checkAuth} from "./middleware/checkAuth";
class App {
  public app: express.Application = express();
  public userController: UserController = new UserController();
  public homeController: HomeController = new HomeController();
  public authController: AuthController = new AuthController();
  public mongoServer = new MongoMemoryServer();

  constructor(){
    this.startDB();
    this.startConfiguring();
    this.registerRoutes();
    this.addInitialData();
    this.startListening();
  }
  private startConfiguring(){
    this.app.use(bodyParser.json()); // support json encoded bodies
    this.app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    this.app.engine("html",mustacheExpress());
    this.app.set("view engine","html");
    this.app.set("views",__dirname+'/views');
    this.app.use('/static',express.static('src/static'));
  }
  private async startDB(){
    mongoose.Promise = Promise;
    this.mongoServer.getConnectionString().then((mongoUri) => {
        const mongooseOpts = {
          // options for mongoose 4.11.3 and above
          autoReconnect: true,
          reconnectTries: Number.MAX_VALUE,
          reconnectInterval: 1000
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
    this.app.route('/')
    .get(checkAuth, this.homeController.Index);
    this.app.route('/login').get(this.authController.Login)
    .post(this.authController.LoginPost);
  }
  private startListening(){
    this.app.listen(5001);
  }
  private addInitialData(){
    let adminUser = new User({id:1,name:"admin",password:"admin"});
    adminUser.save();
  }
}

new App();

