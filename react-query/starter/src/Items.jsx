import { useFetchTasks } from './ReactQueryCustomHook';
import SingleItem from './SingleItem';

const Items = () => {
    const { isLoading, data, error, isError } = useFetchTasks();

    if (isLoading) return <p>Loading...</p>;
    if (error) return 'An error has occurred: ' + error.message; // this is an axios error (404) page not found
    if (isError) return <p>An URL error has occurred</p>;

    return (
        <div className='items'>
            {data.taskList.map((item) => {
                return <SingleItem key={item.id} item={item} />;
            })}
        </div>
    );
};
export default Items;
