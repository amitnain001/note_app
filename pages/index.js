import LayoutScreen from "../components/Layout";
import Prism from "prismjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import Link from "next/link";
import { Login_data } from "../context/context";
import { useContext } from "react";

export default function Home({ data }) {
  const { loginUser } = useContext(Login_data);
  const [notes, setnotes] = useState(data);

  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism 
    };
    highlight(); // <--- call the async function
  }, [data]);

  const deleteNote = async (e) => {
    if (loginUser) {
      let sure = confirm(`Do You Want To Delete :- ${e.title.substring(0, 50)}`);
      if (sure) {
        await axios.delete(`http://localhost:3000/api/deletenote/${e._id}`);
        window.location.reload()
        return;
      } else {
        return;
      }
    }
    else {
      alert('Please login first')
      return;
    }
  }
  return (
    <LayoutScreen title='Home'>
      <div className="h-fit">
        {notes && notes.map(e => {
          if (e.codeLanguage === 'Basic') {
            return (
              <div key={e.title + Math.random} className="my-5 py-5">
                <div className="flex justify-between items-center">
                  <h1 className="py-2 font-bold">{e.title}</h1>
                  <div className="pr-2 pl-5 flex md:text-xl space-x-3">
                    {loginUser && <Link href={`/edit/${e._id}`} ><BiEdit className="hover:text-blue-500 duration-" /></Link>}
                    {loginUser && <button onClick={() => deleteNote(e)} className="hover:text-red-500 duration-300">{<AiFillDelete />}</button>}
                  </div>
                </div>
                <pre >
                  <code className="language-javascript">
                    {e.code}
                  </code>
                </pre>
              </div>
            );
          }
          else { return }
        })}
      </div>

    </LayoutScreen>
  )
}

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:3000/api/getnotes');
  const data = res.data;
  return {
    props: {
      data
    },
  };
}