// js/components/InsertPage.jsx
import * as http from "http";

export default function InsertPage() {
    const insertRecord = (event) => {
        event.preventDefault();
        const nume = document.getElementById("nume").value;
        const prenume = document.getElementById("prenume").value;
        const data = {nume, prenume};
        fetch("/api/records", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(() => {
            console.log("New record inserted");
            document.getElementById("nume").value = "";
            document.getElementById("prenume").value = "";
        });
        window.open('http://localhost:3000/');
        window.close();
    }

    return (
        <section className="bg-red-300 dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="w-[500px] mx-auto text-center text-6xl text-pink-700">Nail Technician Feedback</h1>
                <p className="w-[1000px] mx-auto text-center mt-4 text-3xl text-pink-900">Here is your chance to tell everybody and Ioana how was your experience!</p>

                <form>
                    <div className="mb-6">
                        <label htmlFor="nume" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name is...</label>
                        <input type="text" id="nume"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Ioana Mihai" required/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="prenume"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your feedback...</label>
                        <textarea id="prenume"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  required/>
                    </div>
                    <button type="submit"
                            onClick={ insertRecord }
                            className="text-white bg-red-700 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                    </button>
                </form>
            </div>
        </section>
    )
}