import React, { useState } from 'react';
import LayoutScreen from '../components/Layout';
import axios from "axios";
import { useRef } from 'react';
import { Login_data } from "../context/context";
import { useContext } from "react";
import Cookies from 'js-cookie';


const NewNoteScreen = () => {
    const { loginUser, setloginUser } = useContext(Login_data);
    const defaultNote = {
        title: '',
        codeLanguage: "Basic",
        code: ""
    }

    const userEmail = useRef();
    const userPassword = useRef();
    const [isAdmin, setisAdmin] = useState();

    const [noteData, setnoteData] = useState(defaultNote);

    const onchangeNoteData = (e) => {
        setnoteData({ ...noteData, [e.target.name]: e.target.value });
    }

    const addNewNote = async () => {
        await axios.post('/api/addnote', noteData);
        setnoteData(defaultNote);
        alert('Note added successfully')
    }


    const loginFunction = async () => {
        if (userEmail.current.value && userPassword.current.value) {
            const userDetails = {
                email: userEmail.current.value,
                password: userPassword.current.value
            }
            const userResponse = await axios.post('/api/login', userDetails);
            if (userResponse.data.message === 'Invalid Password or Email.') {
                setisAdmin(userResponse.data.message);
                setTimeout(() => {
                    setisAdmin();
                }, 2000);
                return;
            }
            else {
                Cookies.set("isLoggedIn", JSON.stringify(userResponse.data));
                setloginUser(true);
            }
        }
    }

    return (
        <LayoutScreen title='Add Note'>
            {!loginUser &&
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center max-w-lg">
                        <div className=" bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login In <span className='text-xs text-gray-600'>(Only Admin can login)</span> </h2>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input ref={userEmail} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Password</label>
                                <input ref={userPassword} type="password" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            {isAdmin && <div className='text-red-600 text-center text-xs mb-3'>{isAdmin}</div>}
                            <button onClick={loginFunction} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
                        </div>
                    </div>
                </section>}

            {loginUser && <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 ">Add Note</h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <label htmlFor="Title" className="leading-7 text-sm text-gray-600">Title</label>
                                <input onChange={(e) => onchangeNoteData(e)} value={noteData.title} type="text" id="Title" name="title" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <input onChange={(e) => onchangeNoteData(e)} type="radio" name='codeLanguage' id='javascript' value="Javascript" />
                                    <label className='ml-2 ' htmlFor="javascript">Javascript</label> <br />
                                    <input onChange={(e) => onchangeNoteData(e)} type="radio" name='codeLanguage' id='typescript' value="Typescript" />
                                    <label className='ml-2 ' htmlFor="typescript">TypeScript</label><br />
                                    <input onChange={(e) => onchangeNoteData(e)} type="radio" name='codeLanguage' id='node' value="Node" />
                                    <label className='ml-2 ' htmlFor="node">Node</label><br />
                                    <input onChange={(e) => onchangeNoteData(e)} type="radio" name='codeLanguage' id='basic' value="Basic" defaultChecked />
                                    <label className='ml-2 ' htmlFor="basic">Basic</label><br />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="code" className="leading-7 text-sm text-gray-600">code</label>
                                    <textarea onChange={(e) => onchangeNoteData(e)} value={noteData.code} id="code" name="code" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button onClick={addNewNote} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add Note</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>}
        </LayoutScreen>
    )
}

export default NewNoteScreen;
