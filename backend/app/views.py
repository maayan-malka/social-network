import json
from operator import itemgetter

from rest_framework.decorators import api_view
from rest_framework.response import Response

NUM_POSTS = 10


@api_view(['GET'])
def get_posts(request):
    page = int(request.GET.get("page", 1))

    start_index = (page - 1) * NUM_POSTS
    end_index = (page * NUM_POSTS) - 1

    with open('posts.json') as f:
        all_posts = json.load(f)
        sorted_posts = sorted(all_posts, key=itemgetter('content'))
        relevant_posts = sorted_posts[start_index: end_index]
    
    return Response({"posts": relevant_posts, "page": page})
