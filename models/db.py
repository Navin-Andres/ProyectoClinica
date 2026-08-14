import pymysql
from pymysql.cursors import DictCursor
import sys
import os
import ssl

# Añadir directorio padre al path para importar settings
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from settings import MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB


def get_ssl_context():
    """Crea una conexión TLS para proveedores administrados como Aiven."""
    use_ssl = os.getenv("MYSQL_SSL", "false").lower() in {"1", "true", "yes"}
    if not use_ssl:
        return None

    context = ssl.create_default_context()
    ca_file = os.getenv("MYSQL_SSL_CA")
    if ca_file:
        context.load_verify_locations(cafile=ca_file)
    return context


def get_connection():
    options = dict(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DB,
        connect_timeout=10,
        cursorclass=DictCursor
    )
    ssl_context = get_ssl_context()
    if ssl_context:
        options["ssl"] = ssl_context
    return pymysql.connect(**options)
