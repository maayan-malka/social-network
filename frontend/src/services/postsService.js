import React from 'react';

const BASE_URL  = 'http://localhost:8000/posts/';

const postsService = {

    fetchData(page) {
        return fetch(`${BASE_URL}?page=${page.toString()}`,
            { method: 'GET' })
            .then(response => response.json())
            .catch(error => {
                console.error('Error posts data:', error);
                throw error;
            });
    }
};

export default postsService;
