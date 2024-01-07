import { Box } from '@mui/material';
import "./PostDetails.css";

function PostDetails(props) {
    const { postDetails } = props;

    return (
        <Box className="post-details-box">
            <Box sx={{ mb: 2, fontWeight: 'bold' }}>
                <span>{postDetails.user_name} - </span><span>{postDetails.email}</span><br></br>
            </Box>
            <Box sx={{ mb: 2 }}>
                <span>{postDetails.content}</span><br></br>
            </Box>
            <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                <Box sx={{ flexDirection: 'row', display: 'flex' }}>
                    {postDetails.tags.map((tag) =>
                        <Box className="tag-box" key={tag}>#{tag}</Box>
                    )}
                </Box>
                <Box>
                    <span>{postDetails.created_at}</span>
                </Box>
            </Box>
        </Box>
    );
}

export default PostDetails;