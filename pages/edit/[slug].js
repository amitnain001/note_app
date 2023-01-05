import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import LayoutScreen from '../../components/Layout';
import { useContext } from 'react';
import { Login_data } from "../../context/context";



const EditScreen = ({ note }) => {
    const { loginUser } = useContext(Login_data);
    const router = useRouter();
    const { slug } = router.query;
    // console.log(note)
    // console.log(slug);
    const defaultNote = {
        title: '',
        codeLanguage: '',
        code: '',
    }
    const [noteData, setnoteData] = useState(note);

    const onchangeNoteData = (e) => {
        setnoteData({ ...noteData, [e.target.name]: e.target.value });
    }

    const addNewNote = async () => {
        // console.log(noteData)
        const postData = await axios.put(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/updatenote`, noteData);
        // console.log(postData);
        Router.back();
    }
    useEffect(() => {
        if (!loginUser) {
            router.push('/')
        }
    }, [])


    return (
        <LayoutScreen title='Edit Note'>
            {loginUser && <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Edit Note</h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <label htmlFor="Title" className="leading-7 text-sm text-gray-600 font-bold">Title</label>
                                <input onChange={(e) => onchangeNoteData(e)} value={noteData.title} type="text" id="Title" name="title" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <h1 className='my-2 font-bold'>Select Language</h1>
                                    <input defaultChecked={noteData.codeLanguage === 'Javascript' ? true : false} onChange={(e) => onchangeNoteData(e)} type="radio" name='codeLanguage' id='javascript' value="Javascript" />
                                    <label className='ml-2 ' htmlFor="javascript">Javascript</label> <br />
                                    <input defaultChecked={noteData.codeLanguage === 'Typescript' ? true : false} onChange={(e) => onchangeNoteData(e)} type="radio" name='codeLanguage' id='typescript' value="Typescript" />
                                    <label className='ml-2 ' htmlFor="typescript">TypeScript</label><br />
                                    <input defaultChecked={noteData.codeLanguage === 'Node' ? true : false} onChange={(e) => onchangeNoteData(e)} type="radio" name='codeLanguage' id='node' value="Node" />
                                    <label className='ml-2 ' htmlFor="node">Node</label><br />
                                    <input defaultChecked={noteData.codeLanguage === 'Basic' ? true : false} onChange={(e) => onchangeNoteData(e)} type="radio" name='codeLanguage' id='basic' value="Basic" />
                                    <label className='ml-2 ' htmlFor="basic">Basic</label><br />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="code" className="leading-7 text-sm text-gray-600 font-bold">code</label>
                                    <textarea onChange={(e) => onchangeNoteData(e)} value={noteData.code} id="code" name="code" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button onClick={addNewNote} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Update</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>}
        </LayoutScreen>
    )
}

export default EditScreen


export async function getServerSideProps({ query }) {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/getsinglenote/${query.slug}`,)
    const note = result.data
    return {
        props: {
            note
        }
    };
}