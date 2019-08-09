import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { start } from 'repl';
import { UserController } from "./controller/userController";
import {Mongoose} from "mongoose";
import * as bodyParser from "body-parser";
class App {
  public mongoose = new Mongoose();
  public app: express.Application = express();
  public mongoUrl="";
  public userController: UserController = new UserController();
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
    const mongod = new MongoMemoryServer();
    this.mongoUrl = await mongod.getConnectionString();
    let mongoUrl = this.mongoUrl;
    this.mongoose.connection.on('connected', function() {
      console.log('Mongoose default connection is open to '+mongoUrl);
    });
    
    this.mongoose.connection.on('error', function(err) {
        console.log('Mongoose default connection has occured '+ err +' error');
    });
    
    this.mongoose.connection.on('disconnected', function() {
        console.log('Mongoose default connection is disconnected');
    });
    process.on('SIGINT', function() {
        this.mongoose.connection.close(function() {
            console.log('Mongoose default connection is disconnected due to application termination');
            process.exit(0);
        });
    });
  
    this.mongoose.Promise = global.Promise;
    this.mongoose.set('debug', true);
    this.mongoose.Promise = global.Promise;
    this.mongoose.connect(this.mongoUrl, {useNewUrlParser: true});      
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

