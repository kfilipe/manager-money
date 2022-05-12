import { useNavigate } from 'react-router-dom'

import ProjectForm from '../projects/ProjectForm'
import styles from './MyProjects.module.css'

function MyProjects() {

    const navigate = useNavigate()

    function createPost(project) {

        // iniciar custo e serviços
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                //redirect
                navigate('/projects', {
                    state: { message: 'Projeto criado com sucesso!' }
                })
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.myproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto e adicione os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}

export default MyProjects