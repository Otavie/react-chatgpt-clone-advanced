const Sidebar = ({ setChat, setQuery, setCurrentTitle, uniqueTitles }) => {

    const newQuery = () => {
        setChat(null)
        setQuery("")
        setCurrentTitle(null)
    }

  return (
    <section className='sidebar'>
        <button
        onClick={newQuery}
            className='btn-sidebar'
        >
            + New Chat
        </button>
            <ul className='history'>
                {uniqueTitles?.map((uniqueTitle, index) => 
                    <li key={index}>
                        {uniqueTitle}
                    </li>
                )}
            </ul>
        <div className='creator'>Created by Otavie</div>
  </section>

  )
}

export default Sidebar