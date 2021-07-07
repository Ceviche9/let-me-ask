
import {useHistory, useParams} from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import DeleteImg from '../assets/images/delete.svg';

import { Button } from '../components/button';
import { Question } from '../components/Questions';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/UseAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import { database } from '../services/firebase';

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
    const history = useHistory();
    const params = useParams<roomParams>();
    const roomId = params.id;

    const { title, questions } = useRoom(roomId); 


    async function handleEndRoom(){
       await  database.ref(`rooms/${roomId}`).update({
           endedAt: new Date(),
       })

       history.push(`/`);
    }

    async function handleDeleteQuestion(QuestionID: string){

        if(window.confirm('Você tem certeza que deseja excluir essa pergunta ?')){

           await database.ref(`rooms/${roomId}/questions/${QuestionID}`).remove();
        }

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
                    onClick={handleEndRoom}
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
                            >
                                <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={DeleteImg} alt="Remover pergunta"/>
                                </button>

                            </Question>
                        )
                    })
                }
                </div>
            </main>
        </div>

    )

}