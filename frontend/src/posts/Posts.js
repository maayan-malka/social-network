import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import postsService from '../services/postsService';
import PostDetails from './PostDetails';
import { useSelector, useDispatch } from 'react-redux';
import { setData, incrementPage } from '../features/posts/postsSlice';
import CircularProgress from '@mui/material/CircularProgress';


function Posts() {
    const page = useSelector((state) => state.posts.page);
    const posts = useSelector((state) => state.posts.data);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [end, setEnd] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            dispatch(incrementPage());
            const response = await postsService.fetchData(page + 1);
            dispatch(setData(response["posts"]));
            if (!response["posts"].length) {
                setEnd(true);
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };


    window.onscroll = debounce(() => {
        if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight
            || document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) < 150) {
            if (!end) {
                fetchData();
            }
        }
    }, 100);

    return (
        <Box sx={{}}>
            <h1>The posts</h1>
            <Box sx={{ mb: 3 }}>
                {posts && posts.map((post) => (
                    <PostDetails key={post._id} postDetails={post}></PostDetails>
                ))}
            </Box>
            {!isLoading && <CircularProgress sx={{ margin: 'auto' }} />}
            {error && <span className='red-color'>An error occurred while retrieving the posts</span>}
        </Box>
    );
}

export default Posts;

