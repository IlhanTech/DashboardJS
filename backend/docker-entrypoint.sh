#!/bin/bash


npx prisma migrate dev
npx prisma migrate deploy
npx prisma db push

yarn start