/* eslint-disable prettier/prettier */
// src/firebase/firebase.service.ts
import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class FirebaseService implements OnModuleInit {
    onModuleInit() {
        const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccountPath),
        });
    }

    async sendPushNotification(token: string, title: string, body: string) {
        const message = {
            notification: {
                title,
                body,
            },
            token,
        };

        try {
            const response = await admin.messaging().send(message);
            console.log('Successfully sent message:', response);
            return response;
        } catch (error) {
            console.log('Error sending message:', error);
            throw error;
        }
    }
}