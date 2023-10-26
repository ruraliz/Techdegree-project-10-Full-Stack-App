import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorsDisplay from "./ErrorsDisplay";
import axios from "axios";


import UserContext from "../context/UserContext";

const UpdateCourse = () => {
    const { authUser } = useContext(UserContext)
    const navigate = (useNavigate());
    const courseId = useParams()
    const [course, setCourse] = useState(null);
    const [errors, setErrors] = useState([]);

    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/${courseId.id}`)
                const fetchCourse = response.data
                if (response.data.courseUser.id !== authUser.id) {
                    navigate("/forbidden");
                } else {
                    setCourse(response);
                    setCourseTitle(fetchCourse.title);
                    setCourseDescription(fetchCourse.description);
                    setEstimatedTime(fetchCourse.estimatedTime);
                    setMaterialsNeeded(fetchCourse.materialsNeeded);
                }
            } catch (error) {
                console.log("Error fetching and parsing data", error);
                navigate("error")
            }
        }
        fetchData()
    }, [courseId, authUser, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const course = {
            title:courseTitle,
            description:courseDescription,
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded
        }
        const encodedCredentials = btoa(`${authUser.emailAddress}:${authUser.password}`);
        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Basic ${encodedCredentials}`
            },
            body: JSON.stringify(course)
        }
        try {
            const response = await fetch(`http://localhost:5000/api/courses/${courseId.id}`, fetchOptions)
            if (response.status === 204) {
                navigate(`/courses/${courseId.id}`)
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
    console.log(authUser)
    return(
        <div className="wrap">
            <h2>Update Course</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}/> <p>By {authUser.firstName} {authUser.lastName}</p>
                        <label htmlFor="courseDescription">Course Description</label> <textarea id="courseDescription" name="courseDescription" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)}/>
                        <label htmlFor="materialsNeeded">Materials Needed</label><textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}
export default UpdateCourse
