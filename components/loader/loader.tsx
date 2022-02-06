import React from 'react';

const Loader = () => {
    return (
        <div className='flex justify-center items-center py-3'>
            <div className='animate-spin rounded-full h-5 w-5 border-b-4 border-purple-700'/>
        </div>
    );
}

export default Loader;


