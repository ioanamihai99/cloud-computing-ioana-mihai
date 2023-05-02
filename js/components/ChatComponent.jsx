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

    return (
        <div className={"w-full max-w-[1500px] mx-auto my-10"}>
            <div className={"border border-b-0 rounded-lg border-gray-300'"}>
                <div className={'border-b text-center px-[20px] py-[10px]'}>
					<span className={'text-md font-bold text-gray-900'}>
						This a chat component that looks like Yahoo!
					</span>
                </div>
                <MessageBox chatMessages={chatMessages}/>
            </div>
            <input
                id={'chat-input'}
                type={'text'}
                className="bg-gray-50 border border-gray-300 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                placeholder="Type something..."
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default ChatComponent;