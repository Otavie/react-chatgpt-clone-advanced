import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"

const Main = () => {
    const [query, setQuery] = useState(null)
    const [chat, setChat] = useState(null)
    const [previousChats, setPreviousChats] = useState([])
    const [currentTitle, setCurrentTitle] = useState(null)

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            message: query
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }

    const handleSend = async () => {
        try {
            const response = await fetch('http://localhost:5080/completions', requestOptions)
            const data = await response.json(response)
            setChat(data.choices[0].message, () => {
                setQuery(null)
            })
        } catch (error) {
            console.error('Error sending message: ', error)
        }
    }

    const handlePressEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    }
    
    useEffect(() => {
        console.log(query, chat, currentTitle)

        if (!currentTitle && query && chat) {
            setCurrentTitle(query)
        }

        if (currentTitle && query && chat) {
            setPreviousChats(prevChats => ([
                    ...prevChats, 
                    {
                        title: currentTitle,
                        role: 'user',
                        content: query
                    },
                    {
                        title: currentTitle,
                        role: chat.role,
                        content: chat.content
                    }
                ]))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat, currentTitle])

    const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
    // console.log("Unique Titles: ", uniqueTitles)

  return (
    <>
        <Sidebar
            setChat={setChat}
            setCurrentTitle={setCurrentTitle}
            setQuery={setQuery}
            uniqueTitles={uniqueTitles}
        />

        <section className='main'>
            <div className='main-header'>
                {!currentTitle && <h1 style={{ marginTop:'10px' }}>AwesomeGPT</h1>}
            </div>

            <div className='feed'>
                {currentChat?.map((allChats, index) =>
                    <div key={index}>
                        <div className={`content ${allChats.role}`}>
                            <p>{allChats.content}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className='user-input-container'>
                <div className='user-input'>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder='Type a message...'
                        onKeyDown={handlePressEnter}
                    />
                    <button
                        className='submit'
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </div>

                <div className='small-text'>
                    <p>AwesomeGPT is built using ChatGPT API!</p>
                </div>
            </div>
        </section>
    </>
  )
}

export default Main