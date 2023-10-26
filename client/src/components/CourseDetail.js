import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown"

import UserContext from '../context/UserContext';
const CourseDetail = () => {
    const { authUser } = useContext(UserContext)
    const navigate = (useNavigate());
    const courseId = useParams()
    const [course, setCourse] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/${courseId.id}`)
                const fetchCourse = response.data
                if (!fetchCourse) {
                    navigate("*")
                } else {
                    setCourse(fetchCourse)
                }
            } catch (error) {
                console.log("Error fetching and parsing data", error);
                navigate("/error")
            }

        }
        fetchData()
    }, [courseId, navigate]);

    const handleDelete = async (event) => {
        event.preventDefault();
        const encodedCredentials = btoa(`${authUser.emailAddress}:${authUser.password}`);
        const fetchOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Basic ${encodedCredentials}`
            },
        }
        try {
            await fetch(`http://localhost:5000/api/courses/${courseId.id}`, fetchOptions);
            console.log("course was deleted!")
            navigate("/")
        } catch (error) {
            console.log(error);
            navigate("/error")

        }
    }
    return (
        <>
            {course ? (
                <>
                    <div className="actions--bar">
                        <div className="wrap">
                            {(authUser && authUser.id === course.courseUser.id) ? (
                                <>
                                    <Link className="button" to={`/courses/${courseId.id}/update`}>Update Course</Link>
                                    <Link className="button" onClick={handleDelete}>Delete Course</Link>
                                </>
                            ) : null
                            }
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                    <div className="wrap">
                        <h2>Course Detail</h2>
                        <form>
                            <div className="main--flex">
                                <div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name" key={course.id}>{course.title}</h4>
                                    <p className="p">by {course.courseUser.firstName} {course.courseUser.lastName}</p>
                                    <ReactMarkdown children={course.description}></ReactMarkdown>
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{course.estimatedTime}</p>
                                    <h3 className="course--detail--title">Materials Needed</h3>
                                    <ul className="course--detail--list">
                                        <ReactMarkdown children={course.materialsNeeded}>
                                        </ReactMarkdown>
                                    </ul>

                                </div>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <p>course is null...</p>
            )}
        </>
    )
}

export default CourseDetail