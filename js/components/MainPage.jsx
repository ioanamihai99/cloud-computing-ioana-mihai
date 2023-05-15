// js/components/MainPage.jsx
import {useEffect, useState} from "react";

export default function MainPage() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        try{
            fetch('/api/records', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(json => setRecords(json.data));
        }
        catch (error) {
            console.log(error);
        }
    }, []);

    const deleteRecord = (event) => {
        event.preventDefault();
        const id = event.target.id;
        try {
            fetch(`/api/records?id=${id}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(json => {
                    setRecords(records.filter(record => record._id !== id));
                });
        }
        catch (error) {
            console.log(error);
        }
    }
    const gotoinsertpage = (event) => {
        window.open('http://localhost:3000/insert');
        window.close();
    }
    const gotochatpage = (event) => {
        window.open('http://localhost:3000/chat');
        window.close();
    }
    return (

        <section className="bg-red-300 dark:bg-blue-500">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="  w-[1000px] mx-auto  font-bold text-center text-3xl text-pink-700">Nail Technician Feedback</h1>
                <button type="button"
                        onClick={gotoinsertpage}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Give feedback
                </button>
                <p className="  w-[1000px] mx-auto text-center mt-4 text-2xl text-pink-900">Hello girls! My name is Ioana and this is my work seen through my customers eyes. Enjoy! :)</p>

                <button type="button"
                        onClick={gotochatpage}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">ChatGPT
                </button>
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                    {records.map(record => (
                          <div  key={record._id}
                            className="max-w-sm p-6 bg-blue-300 border border-blue-300 rotate-2 rounded-ee-full shadow hover:bg-pink-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 "
                          >
                            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {record.nume}
                            </h3>
                            <p className="font-serif text-gray-700 dark:text-gray-400">
                                {record.prenume}
                            </p>
                              <div className={"flex justify-center mt-4"}>
                                  <button type="button"
                                          id={record._id}
                                          onClick={deleteRecord}
                                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete
                                  </button>
                              </div>
                          </div>
                    ))
                        }
                </div>
            </div>
        </section>
    )
}