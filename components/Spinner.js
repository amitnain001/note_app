import React from 'react'

const SpinnerScreen = () => {
    return (
        <div className='h-screen flex justify-center items-center bg-blue-100  fixed top-0 left-0 w-screen opacity-75'>
            <img src="../../spinner.gif" alt="Spiner" className='h-20 lg:h-36' />
        </div>
    )
}

export default SpinnerScreen
