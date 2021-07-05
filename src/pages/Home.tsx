import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {

    return(

        <div id="page-auth">
            <aside>
                <img src={illustrationImg}  alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de q&amp;a ao vivo</strong>
                <p>Tire as duvidas das suas audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                </div>
                <button>
                    <img src={googleIconImg} alt="Logo do google"/>
                    Crie sua sala com o Google
                </button>
                <div>ou entre em uma sala</div>
                <form>
                    <input 
                    type="text"
                    placeholder="Digite o código da sala"
                    />
                    <button type="submit" >Entrar na sala</button>
                </form>
            </main>
        </div>

    )
}