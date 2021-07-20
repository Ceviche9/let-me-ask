import { useEffect, useState } from 'react';
import {database} from '../services/firebase';

type FirebaseAuthor = Record<string, {
    authorId: string;

}>

export function UseAdmin(roomId: string){

    const roomRef =  database.ref(`rooms/${roomId}`);

    let RoomCreatorId = '';

    roomRef.on('value', room => {

      const databaseRoom = room.val();
      const FirebaseAuthorId: FirebaseAuthor = databaseRoom.authorId ?? null;

      console.log('Estou no auth:', FirebaseAuthorId);

      RoomCreatorId = String(FirebaseAuthorId);
      
      return roomRef.off('value');
    });

    return {RoomCreatorId};
}