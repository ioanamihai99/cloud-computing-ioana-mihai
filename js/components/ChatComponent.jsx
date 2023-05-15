import React, {useState} from 'react';
import MessageBox from "@/js/components/MessageBox";

function ChatComponent(props) {
    const [chatMessages, setChatMessages] = useState([]);

    const filterChatHistory = chatHistory => {
        let filteredChatHistory = [];
        for( let i = 0; i < chatHistory.length; i++ ){
            const currMessage = chatHistory[i];
            const nextMessage = chatHistory[i+1];

            if( i === chatHistory.length - 1 || (currMessage.type !== 'error' && nextMessage?.type !== 'error' && currMessage.role !== nextMessage?.role) ){
                filteredChatHistory.push(currMessage);
            }
        }

        return filteredChatHistory;
    }

    const buildResponseMessageObject = response => {
        let responseMessageObject;

        responseMessageObject = response.data.message;

        return responseMessageObject;
    }

    const handleKeyDown = async (e) => {
        if(e.key === 'Enter'){
            if(!e.target.value){
                return;
            }

            const currentMessage = e.target.value;
            e.target.value = '';
            e.target.disabled = true;

            const currentMessageObject = {
                role: 'user',
                content: currentMessage,
            }

            setChatMessages(prevChatMessages => [...prevChatMessages, currentMessageObject]);
            const currentChatHistory = [...chatMessages, currentMessageObject];
            const filteredChatHistory = filterChatHistory(currentChatHistory);

            try{
                let response = await fetch('/api/answer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: filteredChatHistory,
                        type: 'michael_scott',
                    }),
                    signal: AbortSignal.timeout(20000),
                });
                response = await response.json();

                e.target.disabled = false;
                e.target.focus();
                console.log(response);

                const responseMessageObject = buildResponseMessageObject(response);
                setChatMessages(prevChatMessages => [...prevChatMessages, responseMessageObject]);
            }
            catch(error){
                console.log(error);
            }
        }
    }
    const gotomainpage = (event) => {
        window.open('http://localhost:3000/');
        window.close();
    }

    return (
        <div className={"w-full max-w-[1500px] mx-auto my-10"}>
            <div className={"border border-b-0 rounded-lg border-red-500'"}>
                <div className={'border-b text-center px-[20px] py-[10px]'}>
					<span className={'text-md font-bold text-red-500'}>
						You can ask something about manicure and pedicure!
					</span>

                </div>
                <button type="button"
                        onClick={gotomainpage}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Go back to the main page
                </button>
                <MessageBox chatMessages={chatMessages}/>
            </div>
            <input
                id={'chat-input'}
                type={'text'}
                className="bg-pink-300 border border-red-500 border-x-0 text-red-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                placeholder="Type something..."
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default ChatComponent;