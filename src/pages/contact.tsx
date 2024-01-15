import { InlineWidget } from 'react-calendly'

function Contact() {
    return (
        <div className='w-screen h-screen pattern-ripples-gray-900/5'>
            <InlineWidget url="https://calendly.com/ankitzm/meet" styles={{ height: '100vh' }} />
        </div>
    )
}

export default Contact