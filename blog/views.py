from multiprocessing import context
from operator import contains
from urllib import request
from django.http import HttpResponse
from django.shortcuts import render
from blog.models import Blog, Category


from django.views.generic import TemplateView, ListView

data = {
    "blogs": [
        {
            "id": 1,
            "title": "komple web geliştirme",
            "image":"1.jpg",
            "is_active": True,
            "is_home": True,
            "description": "çok iyi bir kurs"
        }, 
        {
            "id": 2,
            "title": "Python kursu",
            "image":"2.jpg",
            "is_active": True,
            "is_home": False,
            "description": "çok iyi bir kurs"
        },
         {
            "id": 3,
            "title": "Django kursu",
            "image":"3.jpg",
            "is_active": True,
            "is_home": True,
            "description": "çok iyi bir kurs"
        }
    ]
}
# Create your views here.
def index(request):
    context = {
        #"blogs": data["blogs"]
        "blogs": Blog.objects.filter(is_home=True, is_active = True),
        "categories": Category.objects.all()
    }
    return render(request,"blog/index.html",context)
def blogs(request):
    context = {
        "blogs": Blog.objects.all(),
        "categories": Category.objects.all()
    }
    return render(request,"blog/blogs.html",context)

def blogdetails(request, slug):
    #------ 1 alternatif
    # blogs = data["blogs"]
    # selectedBlog = None
    # for blog in blogs:
    #     if blog["id"]== id:
    #         selectedBlog = blog
    #-------2 alternatif
    # blogs = data["blogs"]
    # selectedBlog = [blog for blog in blogs if blog["id"]==id][0]

    blog = Blog.objects.get(slug=slug)
    return render(request, "blog/blog_details.html", {"blog": blog})

def blogs_by_category(request,slug):
    context = {
        "blogs": Category.objects.get(slug=slug).blog_set.all(),
        #"blogs": Blog.objects.filter(category__slug=slug),
        "categories": Category.objects.all(),
        "selected_category": slug
    }
    return render(request,"blog/blogs.html",context)

def info(request):
    return render(request,"blog/info.html")

   
def searchBox(request):
    if request.method=='GET':        
        search = request.GET.get('search')
        blog = Blog.objects.all().filter(title__icontains=search)
            
        return render(request, 'blog/blogs.html', {'blogs': blog})