import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserController } from "./controller/userController";
import { HomeController } from "./controller/HomeController";
import { AuthController } from "./controller/AuthController";
import { VideoController } from "./controller/VideoController";

import * as bodyParser from "body-parser";
import { User, IUser } from "./model/userModel";
import { IVideoCategory, VideoCategory } from "./model/videoCategory";
import { IVideo, Video } from "./model/video";
import mustacheExpress from "mustache-express";
import {checkAuth} from "./middleware/checkAuth";
import ExpressSession from "express-session";
class App {
  public app: express.Application = express();
  public userController: UserController = new UserController();
  public homeController: HomeController = new HomeController();
  public authController: AuthController = new AuthController();
  public videoController: VideoController = new VideoController();

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
    this.app.use(ExpressSession({
      secret: 'i-love-husky',
      resave: false,
      saveUninitialized: true
    }));
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
    this.app.route('/video/getwatched').get(this.videoController.GetWatchedBefore);
  }
  private startListening(){
    this.app.listen(5001);
  }
  private addInitialData(){
    let adminUser = new User({id:1,name:"admin",password:"admin"});
    adminUser.save();
    let videoCategory = new VideoCategory({id:1,name:"Scientific Fiction"});
    videoCategory.save();
    videoCategory = new VideoCategory({id:2,name:"Drama"});
    videoCategory.save();
    videoCategory = new VideoCategory({id:3,name:"Action"});
    videoCategory.save();
    
    let video = new Video({videoCategoryID:1,name:'Stranger Things',length:'01:00:00',id:1,uploadedDateTime:Date.now(),type:'series'});
    video.save();
    video = new Video({videoCategoryID:1,name:'End Game',length:'01:15:00',id:2,uploadedDateTime:Date.now(),type:'blockbuster'});
    video.save();
    video = new Video({videoCategoryID:2,name:'Love me 3000',length:'01:00:00',id:3,uploadedDateTime:Date.now(),type:'series'});
    video.save();
    video = new Video({videoCategoryID:2,name:'Fast Furious 8',length:'01:00:00',id:4,uploadedDateTime:Date.now(),type:'blockbuster'});
    video.save(); 
    video = new Video({videoCategoryID:3,name:'Fast Furious 7',length:'01:30:00',id:5,uploadedDateTime:Date.now(),type:'blockbuster'});
    video.save();
    video = new Video({videoCategoryID:3,name:'Kidnapped',length:'01:30:00',id:6,uploadedDateTime:Date.now(),type:'blockbuster'});
    video.save();

    
  }
}

new App();

