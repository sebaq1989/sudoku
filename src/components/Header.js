import React from 'react';

function Header(props) {
    return (
        <header>
            <div className="headerWrapper">
                <div className="logo">
                    <h2 onClick={() => props.changeView('show')}>Su<span className="dank">dank</span>u</h2>
                </div>
                <div className="buttonWrapper">
                    <button onClick={() => props.changeView('show')}>Puzzles</button>
                    <button onClick={() => props.changeView('dashboard')}>Dashboard</button>
                </div>
            </div>
        </header>
    )
}

export default Header;