from django.contrib import admin
from.models import Blog,Category
from django.utils.safestring import mark_safe
# Register your models here.

class BlogAdmin(admin.ModelAdmin):
    list_display = ("title","is_active","is_home","slug","selected_categories")
    list_editable = ("is_active","is_home",)
    search_fields = ("title","description")
    list_filter = ("categories",) #admin paneli filtre

    def selected_categories(self,obj):
        html ="<ul>"

        for category in obj.categories.all():
            html+= "<li>" + category.name + "</li>"
        html+= "</ul>"    
        return mark_safe(html)

admin.site.register(Blog,BlogAdmin)
admin.site.register(Category)
admin.site.site_header="admin panel"
