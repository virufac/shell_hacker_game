import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_mail import Mail
from argon2 import PasswordHasher
from flask_debugtoolbar import DebugToolbarExtension as DebugTool

app = Flask("shellmancer")
app.config.from_object(os.environ['APP_SETTINGS'])

toolbar = DebugTool(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# bcrypt = Bcrypt(app)
ph = PasswordHasher()

login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

mail = Mail(app)

from shellmancer import routes
