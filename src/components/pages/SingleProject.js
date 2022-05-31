import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../layout/Container'
import Loading from '../layout/Loading/Loading'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import styles from './SingleProject.module.css'



function SingleProject() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Tyype': 'application/json',
                },
            })
                .then(res => res.json())
                .then((data) => {
                    setProject(data)
                })
                .catch(err => console.log(err))
        }, 300);
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project) {
        setMessage('')

        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then((data) => {

                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto Atualizado!')
                setType('sucess')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.form}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Orçado:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Realizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.form}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir edição"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.form}>
                                {showServiceForm && <div>Form service</div>}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            <p>Itens de serviços</p>
                        </Container>
                    </Container>
                </div >
            ) : (
                <Loading />
            )
            }
        </>
    )
}

export default SingleProject