"use strict";

const { graphql } = require('graphql');
const { MongoClient } = require('mongodb');
const assert = require('assert');
const graphqlHTTP = require('express-graphql');
const express = require('express');

const mySchema = require('./schema/main');

const app = express();

const MONGO_URL = 'mongodb://localhost:27017/test';

MongoClient.connect(MONGO_URL, (err, db) => {
  assert.equal(null, err);
  console.log('Connected to MongoDB server');

  app.use('/graphql', graphqlHTTP({
    schema: mySchema,
    context: { db }
  }));

  app.listen(3000, () =>
    console.log('Running Express.js on port 3000')
  );

});
