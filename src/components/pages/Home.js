import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>
                Bem vindo ao <span>Manager Money</span>
            </h1>
            <p>Gerencie os seus projetos agora!</p>
            <LinkButton to='/myproject' text='Criar Projeto' />
            <img src={savings} alt="MM"></img>
        </section>

    )
}

export default Home