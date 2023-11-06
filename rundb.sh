#!/bin/bash

# Start MongoDB
mongod --dbpath ./db


# Wait for all background processes to finish
wait