import { useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'

import Message from '../layout/Message'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'

import styles from './Projects.module.css'
import { getProjects, deleteProject } from '../../services/firebaseService'


function Projects () {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setprojectMessage] = useState('')


    const location = useLocation()
    let message =  ''
    if (location.state) {
        message = location.state.message
    }

    useEffect (() => {
        setTimeout(() => {
            getProjects()
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
        }, 300)
    }, [])

    function removeProject(id) {
        deleteProject(id)
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setprojectMessage('Projeto removido com sucesso!') // message
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name} 
                            budget={project.budget}
                            category={project.category.name}
                            key={project.key}
                            handleRemove={removeProject}
                        />
                    ))
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.lenght === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Projects