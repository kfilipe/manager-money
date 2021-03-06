import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../layout/Container'
import Loading from '../layout/Loading/Loading'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import styles from './SingleProject.module.css'

import { parse, v4 as uuidv4 } from 'uuid'
import ServiceCard from '../service/ServiceCard'


function SingleProject() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [services, setServices] = useState([])
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
                    setServices(data.services)
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

    function removeService(id, cost) {

        const serviceUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = serviceUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
            .then((res) => res.json())
            .then((data) => {
                setProject(projectUpdated)
                setServices(serviceUpdated)
                setMessage('Servi??o removido com sucesso')
                setType('sucess')
            })
            .catch(err => console.log(err))

    }

    function createService(project) {

        //ultimo servi??o para valida????o de saldo
        console.log(project.services)
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Or??amento ultrapassado, verifique o valor do servi??o')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                //servicos
                setShowServiceForm(false)
            })
            .catch((err) => console.log(err))
    }


    function editPost(project) {
        setMessage('')

        if (project.budget < project.cost) {
            setMessage('O or??amento n??o pode ser menor que o custo do projeto!')
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
                                        <span>Or??ado:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Realizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.form}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir edi????o"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={styles.service_form_container}>
                            <h2>Adicione um servi??o:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar servi??o' : 'Fechar'}
                            </button>
                            <div className={styles.form}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar Servi??o"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Servi??os</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {services.length === 0 && <p>N??o h?? servi??os cadastrados</p>}
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