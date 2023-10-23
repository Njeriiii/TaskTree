import CreateBoard from '../Components/CreateBoard';
import TaskPage from './TaskPage';
import DisplayBoard from '../Components/DisplayBoard';

function DisplayPage() { 

    return (
        <>
            <CreateBoard />
            <DisplayBoard />
            {/* <TaskPage /> */}
        </>
    );
}
export default DisplayPage;
