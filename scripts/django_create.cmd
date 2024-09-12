cd ..
cd back

python -m venv venv
call venv/scripts/activate

pip install djangorestframework
pip install django-cors-headers





python manage.py runserver

cmd