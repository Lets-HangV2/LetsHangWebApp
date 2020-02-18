# LetsHangWebApp
CS491 Senior Project

Dependencies

1) Install virtualenv: pip install virtualenv

2) Create virtual enviornment using: virtualenv .<Name_You_Want>

3) Start virtual enviornment: soruce .<Name_You_Want>/bin/activate
   Example: virtualenv .LetsHang
            soruce .LetsHang/bin/activate

4) Pip install: falcon, falcon-jsonify, mongoengine, gunicorn

5) Make sure you have MongoDB installed: if not install

6) Update app/__init__.py for the right DB credentials

7) To Run using gunicorn: gunicorn -p 8000 --reload app:app
