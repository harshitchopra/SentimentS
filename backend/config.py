import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess-i-am-from-iitm-diploma'  # Fallback if not set
    REMEMBER_COOKIE_DURATION = timedelta(days=3)  # Can be adjusted as needed
    
    # Turso Database Configuration
    TURSO_DB_URL = os.environ.get('TURSO_DB_URL')
    TURSO_AUTH_TOKEN = os.environ.get('TURSO_AUTH_TOKEN')
    
    # Format the database URL with auth token for SQLAlchemy
    if TURSO_DB_URL and TURSO_AUTH_TOKEN:
        # Ensure the URL starts with libsql://
        if not TURSO_DB_URL.startswith('libsql://'):
            TURSO_DB_URL = f"libsql://{TURSO_DB_URL}"
        SQLALCHEMY_DATABASE_URI = f"sqlite+{TURSO_DB_URL}/?authToken={TURSO_AUTH_TOKEN}&secure=true"
    else:
        # Fallback to local SQLite if Turso credentials are not provided
        SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'sentimentScout.db')
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Avoids unnecessary overhead for modification tracking
    
    # For Production Logging and Error Handling
    if os.environ.get('FLASK_ENV') == 'production':
        DEBUG = False
        TESTING = False
        LOGGING_LEVEL = 'ERROR'
    else:
        DEBUG = True
        TESTING = True
        LOGGING_LEVEL = 'DEBUG'

    