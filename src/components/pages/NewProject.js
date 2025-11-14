import { useNavigate } from 'react-router-dom'

import ProjectForm from '../project/ProjectForm'

import styles from './NewProject.module.css'
import { addProject } from '../../services/firebaseService'

function NewProject () {
    const navigate = useNavigate()

    function createPost(project) {

        // initialize cost and services
        project.cost = 0
        project.services = []

        addProject(project)
        .then((data) => {
            navigate("/projects", {state: { message: "Projeto criado com sucesso!" }});
        })
        .catch(err => console.log(err))

    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject