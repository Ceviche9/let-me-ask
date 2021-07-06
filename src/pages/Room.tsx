import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import {useParams} from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/UseAuth';
import { database } from '../services/firebase';


import '../styles/room.scss';

type firebaseQuestions = Record<string,{

    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type roomParams = {
    id: string;
}

type Questions = {

    id: string;
    author: {
      name: string;
      avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

export function Room(){

    const {user} = useAuth();

    const params = useParams<roomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [tittle, setTittle] = useState('');

    const roomId = params.id;

    useEffect(() => {

        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {

           const databaseRoom = room.val();
           const firebaseQuestions: firebaseQuestions = databaseRoom.questions ?? {};

            
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                id: key,
                content: value.content,
                author: value.author,
                isHighlighted: value.isHighlighted,
                isAnswered: value.isAnswered,
            }
        });

            setTittle(databaseRoom.tittle);
            setQuestions(parsedQuestions);

        });

    }, [roomId]);

    async function handleSendQuestion(event: FormEvent){
        event.preventDefault();

        if(newQuestion.trim() === '') return;

        if(!user) {

            throw new Error('You must be logged to');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar
            },
            isHighLighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);
    }
    
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask"/>
                    <RoomCode code={params.id}/>
                </div>
            </header>
            <main className="content">
               <div className="room-tittle">
                   <h1>Sala {tittle}</h1>
                  {questions.length > 0 &&  <span>{questions.length} perguntas</span> }
                </div>

                <form onSubmit={handleSendQuestion} >
                    <textarea
                    placeholder="O que você quer perguntar?"
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}
                    />

                    <div className="form-footer">
                       { user ? (
                           <div className="user-info"> 
                            <img src={user.avatar} alt={user.name}/>
                            <span>{user.name}</span>
                           </div>
                       ) : (
                        <span>Para enviar uma pergunta <button>faça seu login</button></span>
                       )}
                        <Button  type="submit"  disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
                {JSON.stringify(questions)}
            </main>
        </div>

    )

}