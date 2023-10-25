import { useNavigate } from "react-router-dom"
import { useRef, useState, useContext } from "react";
import ErrorsDisplay from './ErrorsDisplay';


import UserContext from "../context/UserContext";

const CreateCourse = () => {
    const { authUser } = useContext(UserContext)
    const navigate = (useNavigate());

    const courseTitle = useRef(null);
    const courseDescription= useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const course = {
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authUser.userId
        }
        const encodedCredentials = btoa(`${authUser.emailAddress}:${authUser.password}`);
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Basic ${encodedCredentials}`
            },
            body: JSON.stringify(course)
        }
        try {
            const response = await fetch("http://localhost:5000/api/courses", fetchOptions)
            if (response.status === 201) {
                navigate('/')
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error();
            }
        } catch (error) {
            navigate("/error")
        }
    }
    const handleCancel = (e) => {
        e.preventDefault();
        navigate("/");
    }
    return (
        <div className="wrap">
            <h2>Create Course</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label><input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} /> <p>By {authUser.firstName} {authUser.lastName}</p>
                        <label htmlFor="courseDescription">Course Description</label> <textarea id="courseDescription" name="courseDescription" ref={courseDescription}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label> <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime}/>
                        <label htmlFor="materialsNeeded">Materials Needed</label> <textarea id="materialsNeeded" name="materialsNeeded"ref={materialsNeeded}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>


        </div>
    )


}

export default CreateCourse; 