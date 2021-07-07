

import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import {useParams} from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/button';
import { Question } from '../components/Questions';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/UseAuth';
import { useRoom } from '../hooks/useRoom';
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

type QuestionType = {

    id: string;
    author: {
      name: string;
      avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

export function AdminRoom(){

    
    const {user} = useAuth();
    
    const params = useParams<roomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;

    const { title, questions } = useRoom(roomId);

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
        setNewQuestion('');
    }
    
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask"/>
                   <div>
                   <RoomCode code={params.id}/>
                    <Button
                    isOutlined
                    >
                        Encerrar Sala
                    </Button>
                   </div>
                </div>
            </header>
            <main className="content">
               <div className="room-tittle">
                   <h1>Sala {title}</h1>
                  {questions.length > 0 &&  <span>{questions.length} perguntas</span> }
                </div>

                
                <div className="question-list">
                {
                    questions.map(question => {
                        return (
                            <Question
                            key={question.id}
                            content={question.content}
                            author={question.author}
                            />
                        )
                    })
                }
                </div>
            </main>
        </div>

    )

}